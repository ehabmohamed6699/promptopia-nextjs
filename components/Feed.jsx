'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Link from "next/link"

const PromptCardList = ({data, handleTagClick}) => {
  return (<div className={`mt-16 ${data?.length > 0?"prompt_layout":""}`}>
    {data?.length > 0 ? data?.map((post)=>(  
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
    )) : <p className="text-center w-full font-inter text-gray-900">No prompts found, <Link href={'/create-prompt'}><span className="blue_gradient">create prompts and share them with others</span></Link></p>}
  </div>)
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [debounced, setDebounced] = useState("")
  const [posts, setPosts] = useState([])
  const [fetchedPosts, setFetchedPosts] = useState([])
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
    setFetchedPosts(data)
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setDebounced(searchText)
    },500)
    return () => {
      clearTimeout(timeout)
    }
  },[searchText])

  useEffect(()=>{
    if(debounced){
      const searchPosts = async () => {
        const response = await fetch(`/api/prompt?search=${debounced}`,{
          method: 'POST'
        })
        const data = await response.json()
  
        setPosts(data)
      }
  
      searchPosts()
    }else if(fetchedPosts.length > 0){
      setPosts(fetchedPosts)
    }
    else{
      fetchPosts()
    }
  },[debounced])
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username" 
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />

      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag)=>{setSearchText(tag)}}
      />
    </section>
  )
}

export default Feed