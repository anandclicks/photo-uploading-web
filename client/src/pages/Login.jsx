import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContex } from '../../context/userContext'
import Loading from '../components/Loading'

const Login = () => {
   // USESTATE FOR NAVIGATION 
   const [isNavigate, setisNavigate] = useState(false)

    // USESTATE FOR LOADING ANIMATION 
    const [isloading, setisloading] = useState(false)

  // USESTAET FOR LOGIN DATA 
  const [loginFromData, setloginFromData] = useState({
    userName : '',
    password : ''
  })

  // FUNCTION FOR DATA HANDLING 
  const handleInputData = (evt)=> {
    setloginFromData({...loginFromData,[evt.target.name] : evt.target.value})
  }

  // IF USERNAME OR PASSWORD IS WORNG 
  const [error, seterror] = useState()
  // FUCNTION FOR API CALL 
  const {setloggedInUserData,loggedInUser} = useContext(UserContex)
  const apiCallForLogin = async(evt)=> {
    evt.preventDefault()
    setisloading(true)
    const response = await axios.post('http://localhost:3000/api/v1/user/login', loginFromData, {withCredentials : true})
    console.log(response)
    if(!response.data.sucess) {
      seterror(response.data.message)
    }
    setloggedInUserData(response.data.user)
    setisloading(false)
     if(response.data.sucess) {
      setisNavigate(true)
     }
  }
  
  return (
    <>
    {isloading && (
      <Loading/>
    )}
    {isNavigate && (
      <Navigate to={'/home'} replace={true}/>
    )}
    
    <div className='container loginContainer h-[100vh] mx-auto flex justify-center items-center bg-blackR'>
     <div className="formWrapper">
     <h2 className='text-2xl text-white  m-3 ms-0'>Welcome Back to Your Community! <span className='text-[#7a48ee]'>Log in</span> <br /> to Your World</h2>
     <div className='flex loginForm'>
      <div className='w-[300px] h-[400px] bg-blue-700 rounded-s-xl overflow-hidden loginFormimageSide'>
        <img className='h-[400px] w-full object-cover' src="\loginwalpaper.jpg" alt="" />
      </div>
      <form onSubmit={(evt)=> apiCallForLogin(evt)} className='loginFormSide flex flex-col items-start p-5  justify-center ps-5' encType='multipart/form-data'>
     <input onChange={(evt)=> handleInputData(evt)} required className='mt-3 h-[45px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' type="text" placeholder='Username' name='userName' value={loginFromData.userName} />
     <input onChange={(evt)=> handleInputData(evt)} required className='mt-3 mb-5 h-[45px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' type="text" placeholder='Password' value={loginFromData.password} name='password' />
     <input className='primaryColor rounded-md px-5 py-2 text-white w-full mt-5 cursor-pointer' type="submit" value={"Login"} />
     {
      error && (
        <small className='text-red-600 mt-2 font-light'>{error}</small>
      )
    }
     <small className='text-white mt-5 '>I don't have any Account <Link to={'/'} className='text-[#7a48ee]'>Signup</Link></small>
     
     </form>
     </div>
     </div>
    </div>
    </>
  )
}

export default Login