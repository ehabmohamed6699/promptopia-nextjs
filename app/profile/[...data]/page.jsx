'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


import Profile from '@components/Profile'

import React from 'react'

const MyProfile = ({params}) => {
    const {data:session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()
    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.data[0]}/posts`)
          const data = await response.json()
          setPosts(data)
        }
    
        session?.user?.id && fetchPosts()
      },[])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const confirmed = confirm('Are you sure you want to delete this prompt')
      if(confirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:"DELETE"
          })

          const filteredPosts = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <Profile 
        name={session?.user?.id === params?.data[0]?"My":params?.data[1]}
        desc={`Welcome to ${session?.user?.id === params?.data[0]?"your":`${params?.data[1]}'s`} personalized profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        personal={session?.user?.id === params?.data[0]}
    />
  )
}

export default MyProfile