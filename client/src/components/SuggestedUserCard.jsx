import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SuggestedUserCard = () => {
  const [allUsers, setallUsers] = useState([])
  useEffect(() => {
   const apiCallForUsers = async()=> {
    const response = await axios.get('http://localhost:3000/api/v1/users', {withCredentials : true})
    setallUsers(response.data.allUsers)
   }
   apiCallForUsers()
  }, [])

  return (
    <>
    {allUsers.map((item,key)=> (
      <div key={key} className='h-[55px] w-full bg-slate-800 mb-4 mt-2 rounded-lg flex items-center justify-between gap-2 px-2'>
      <div className='flex items-center gap-2'>
      <div className="profilePic h-[45px] w-[45px] rounded-full bg-black overflow-hidden">
        <img className='h-full w-full object-cover' src={`${item.profileImage}`} alt="" />
      </div>
      <div className="nameAndUsername">
        <h3 className='leading-3'>{item.firstName} {item.lastName}</h3>
        <small className='leading-3'>{item.userName}</small>
      </div>
      </div>
      {/* <div className="followBtb cursor-pointer">Follow <i className="ri-user-add-line"></i></div> */}
    </div>
    ))}
    </>
  )
}

export default SuggestedUserCard