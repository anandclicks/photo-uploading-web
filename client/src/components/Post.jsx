import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Post = () => {
    const [posts, setposts] = useState([])
    useEffect(() => {
        const getAllPost = async()=> {
            const response = await axios.get('http://localhost:3000/api/v1/posts',{withCredentials : true})
            setposts(response.data.posts)
          }
            getAllPost()
      }, [])
  return (
   <div>
    {posts.map((item,index)=> (
        <div key={index} className='postWrapper mb-10'>
        <div className="userInfo flex items-center gap-2">
         <div className="profilePic h-[50px] w-[50px] rounded-full bg-slate overflow-hidden">
            <img className='h-full w-full object-cover' src={`${item.author.profileImage}`} alt="" />
         </div>
         <div className="username">
             <h3 className='leading-3 text-white'>{item.author.firstName} {item.author.lastName}</h3>
             <small className='leading-3 text-white'>{item.author.userName}</small>
         </div>
         
        </div>
        <div className="title mt-4">
         {/* <p className='leading-3'>{item.title}</p> */}
         <small className='text-slate-300 leading-3'>{item.dipscription}</small>
        </div>
         <div className="postWrapper mt-2">
             <div className='h-[400px] w-full border-[1px] border-stone-800  rounded-xl'>
                {item.image.toLowerCase().endsWith('mp4') && (
                    <video className='h-full w-full object-contain'  autoPlay muted controls src={`${item.image}`}></video>
                )}
                {item.image.toLowerCase().endsWith('jpg') && (
                 <img className='h-full w-full object-contain' src={`${item.image}`} alt="" />
                )}
             </div>
         </div>
        </div>
    ))}
   

   </div>
  )
}

export default Post