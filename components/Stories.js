import { faker } from '@faker-js/faker';
import { useState, useEffect } from "react"
import Story from './Story'
import { useSession } from "next-auth/react"

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession()

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));

    setSuggestions(suggestions);
  }, [])
  

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 
    border-gray-200 border rounded-sm overflow-x-scroll 
    scrollbar-thin scrollbar-thumb-black ">
      { session && (
        <Story image={session.user.image} 
               username={session.user.username}/>
      )}

      { suggestions.map( (profile) => (
        <Story 
            key={profile.userId} 
            image={profile.avatar} 
            username={profile.username} 
        />
      ))}
    </div>
  )
}

export default Stories;