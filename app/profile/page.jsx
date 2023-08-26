"use client"

import { useState,useEffect } from "react"

import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"

import Profile from "@components/Profile"
const myProfile = () => {
    
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])
    const router=useRouter()

    useEffect(()=>{
        const fetchPosts=async ()=>{
           const response=await fetch(`/api/users/${session?.user.id}/posts`);
           const data=await response.json();
          
           setPosts(data)
        }

        if(session?.user.id){
            fetchPosts()
        }
  
      
  
  
    },[])





    const handleEdit=(post)=>{

         router.push(`/update-prompt?id=${post._id}`)
        
    }
   

    const handleDelete= async (post)=>{
        const hasConfirmed= confirm("Are you sure to delete?")
    
        if(hasConfirmed){
          try {
            await fetch (`/api/prompt/${post._id}`,{
                method:"DELETE"
            })
          } catch (error) {
    
            console.log(error)
            
          }
        }

        const filteredPosts=posts.filter((p)=>p._id!==post._id)
    
        setPosts(filteredPosts)


      }


  
  
    return (
       <Profile name="My" desc="Welcome to personalized profile page" data={posts}
       
       handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default myProfile