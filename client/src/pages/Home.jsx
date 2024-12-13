import React, { useContext, useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import SuggestedUserCard from '../components/suggestedUserCard'
import Post from '../components/Post'
import { UserContex } from '../../context/userContext'
import axios from 'axios'
import CreatePost from '../components/CreatePost'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'


const Home = () => {
    // USESTATE FOR NAVIGATION 
  
  const {loggedInUser, setloggedInUserData,setPostData} = useContext(UserContex)
  useEffect(() => {
    const getLoddedInUserData = async()=> {
      const response = await axios.get('http://localhost:3000/api/v1/userData',{withCredentials : true})
      setloggedInUserData(response.data.user)   
      setPostData(response.data.post)
    }
    getLoddedInUserData()
  },[])

  // GETTING VALUE FOR SHOWING CREATEPOST BOX 
  const {handleCreatepostState,createpostState} = useContext(UserContex)
  return (
    <>

    <div className='h-[100vh] container mainContainer  mx-auto p-5 flex gap-5 justify-between'>
      <div className="createPostBtn w-full h-[55px] items-center shadow-2xl shadow-white absolute bottom-0 bg-black flex justify-center">
      <i onClick={handleCreatepostState} className="ri-add-fill primaryColor h-[45px] w-[45px] flex justify-center items-center text-[25px]  rounded-full"></i>
      </div>
      <div className="left-part w-[25%] h-full p-5 border-[1px] border-stone-800 rounded-lg">
       <div className="leftTop">
       <ProfileCard userProfileData = {loggedInUser}/>
       </div>
       <div className="leftBottom mt-5">
        <h2>Other users</h2>
        <SuggestedUserCard/>
       </div>
      </div>
      <div className="middle-part allPosts w-[40%] h-full  rounded-lg p-5 overflow-scroll ">
        <Post/>
      </div>
      <div className={`${createpostState ? 'createPostbox' : ''} right-part w-[25%] h-min-[500px] flex-col rounded-lg p-5`}>
        <h2 className='text-center mb-3'>Create post</h2>
        <CreatePost closeBoxFn = {handleCreatepostState} />
      </div>
    </div>
    </>
  )
}

export default Home