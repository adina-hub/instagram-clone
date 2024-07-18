import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { db } from '../firebase'
import Moment from "react-moment"

function Post({ id, username, userImg, img, caption }) {
  const {data: session} = useSession()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const unsubscribeComments = onSnapshot(
      query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs)
    )
    const unsubscribeLikes = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    )

    return () => {
      unsubscribeComments()
      unsubscribeLikes()
    }
  }, [db, id])

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
  }, [likes, session])

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username
      })
    }
  }
  
  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  }

  return (
    <div className="bg-white my-7 rounded-sm border">

      <div className="flex items-center p-5">
        <img src={userImg} alt="userImg" className="rounded-full h-12 w-12 object-contain border p-1 mr-3" />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} alt="img" className="object-cover w-full" />

      { session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            { hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      <div className="p-5 truncate">
        { likes?.length > 0 && (
          <p className="font-bold mb-1">{ likes.length } likes</p>
        ) }
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </div>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img src={comment.data().image} 
                   className="h-7 rounded-full" 
                   alt=""
              />
              <div className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </div>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      { session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7"/>
          <input 
               type="text" 
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               placeholder="Add a comment..." 
               className="border-none flex-1 focus:ring-0"/>
          <button type="submit" 
                  disabled={!comment.trim()} 
                  onClick={sendComment}
                  className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )} 
    </div>
  )
}

export default Post;
