import React, { useContext, useEffect } from 'react'
import { UserContex } from '../../context/userContext'
import axios from 'axios'

const ProfileCard = ({userProfileData = {
    email : '',
    firstName : "",
    lastName : '',
    post : [{}],
    profileImage : '',
    userName : ''
}}) => {
  return (
    <div className='h-[400px] w-full rounded-xl overflow-hidden border-[1px] border-stone-800'>
        <div className="banner h-[25%] w-full bg-slate-500"></div>
        <div className="profileDetails flex flex-col items-center">
            <div className="priflePic h-[90px] w-[90px] rounded-full bg-white border-[3px] border-black mt-[-35px] overflow-hidden">
                <img className='h-full w-full object-cover' src={`${userProfileData.profileImage}`} alt="" />
            </div>
            <div className="username mb-2 text-slate-300">
                {userProfileData.userName}
            </div>
            <div className="otherDetails flex w-full justify-evenly mt-5">
                <div className="post flex flex-col justify-center items-center w-[33%]">
                {userProfileData && userProfileData.post ? `${userProfileData.post.length}` : '0'}
                    <h4>Post</h4>
                </div>
                <div className="followers flex flex-col justify-center items-center w-[33%]">
                <h3>0</h3>
                <h4>Likes</h4>
                </div>
            </div>
           <div className='flex w-full justify-evenly'>
           <div className="btn primaryColor px-5 py-2 rounded-lg mt-5 cursor-pointer">View profile <i className="ri-user-line"></i></div>
           <div className="btn bg-stone-500 px-5 py-2 rounded-lg mt-5 cursor-pointer">Edit profile <i className="ri-pencil-line"></i></div>
           </div>
        </div>
    </div>
  )
}

export default ProfileCard