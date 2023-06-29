import Post from './Post'

const posts = [
  {
    id: '123',
    username: 'adaa23',
    userImg: 'https://links.papareact.com/3ke',
    img: 'https://links.papareact.com/3ke',
    caption: 'Subscribe to this'
  },
  {
    id: '822',
    username: 'sonny',
    userImg: 'https://links.papareact.com/3ke',
    img: 'https://links.papareact.com/3ke',
    caption: 'This is awesome'
  }
]

function Posts() {
  return (
    <div>
      { posts.map( (post) => (
        <Post key={post.id} 
              id={post.id}
              username={post.username} 
              userImg={post.userImg}
              img={post.img}
              caption={post.caption} />
      ) ) }
    </div>
  )
}

export default Posts