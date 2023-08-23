"use client"

import { useState,useEffect } from 'react'

import PromptCard from "@components/PromptCard"


const PromptCardList=({data,handleTagClick})=>(

    <div className='mt-16 prompt_layout'>
       {data.map(post=>(<PromptCard key={post._id}
       post={post} handleTagClick={handleTagClick}/>))}
    </div>
   )





const Feed = () => {

  const[searchText,setSearchText]=useState("")
  const[posts,setPosts]=useState([])

  
  useEffect(()=>{
      const fetchPosts=async ()=>{
         const response=await fetch("/api/prompt");
         const data=await response.json();
        
         setPosts(data)
      }

      fetchPosts()


  },[])


  
  
  
  const handleSearchChange=(e)=>{
    
  }




  return (
   <section className='feed'>
    <form className='relative w-full flex-center'>
      <input className='search_input peer' type='text' placeholder='Search for a tag or a username'
      value={searchText} onChange={handleSearchChange} required/>
    </form>

    <PromptCardList data={posts} handleTagClick={()=>{}} />



   </section>
  )
}

export default Feed