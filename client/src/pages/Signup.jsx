import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContex } from '../../context/userContext'
import Loading from '../components/Loading'


const Signup = () => {
  // USESTATE FOR NAVIGATION 
  const [isNavigate, setisNavigate] = useState(false)
  // USESTATE FOR LOADING ANIMATION 
  const [isloading, setisloading] = useState(false)

  const [image, setimage] = useState('')
  // USESTATE FOR SIGNUP FROM DATA 
  const [signupData, setsignupData] = useState({
    firstName: '',
    lastName : '',
    userName : '',
    email : '',
    password : '',
    image : ''
  })
  // FUNCTION FOR SIGNUP DATA HANDLING 
  const handleSignUpData = (evt)=> {
    setsignupData({...signupData,[evt.target.name] : evt.target.value})
  }
  // FUNCTION FOR IMAGE HANDLING 
  const handleImage = (evt)=> {
    setimage(evt.target.files[0])
  }
    // IF ERRORS OCCURES
    const [error, seterror] = useState()
  // FUCNTION FOR API CALL 
  const apiCallForSignup = async(evt)=> {
    setisloading(true)
    evt.preventDefault()
    const finalData = new FormData()
    finalData.append('firstName', signupData.firstName)
    finalData.append('lastName', signupData.lastName)
    finalData.append('userName', signupData.userName)
    finalData.append('email', signupData.email)
    finalData.append('password', signupData.password)
    finalData.append('image', image )

    const response = await axios.post('http://localhost:3000/api/v1/user/registration', finalData, {withCredentials : true})
    if(response.data)
    if(response.data.sucess) {
      setisNavigate(true)
    }
    else {
      
    }
  }

  return (
  <>
  {isloading && (
    <Loading/>
  )}
  {
    isNavigate && (
      <Navigate to={'/login'} replace={true}/>
    )
  }
    <div className='signupFormWrapper container h-[100vh] mx-auto flex justify-center items-center bg-blackR'>
    <div className="formWrapper">
    <h2 className='text-2xl text-white  m-3 ms-0 signupFormTitle '>Ready to Share Your Story? with <span className='text-[#7a48ee]'>@Anacode </span> <br /> World is waiting for you! </h2>
    <div className='flex signupForm'>
     <div className='w-[400px] signupImageSide primaryColor rounded-s-xl overflow-hidden'>
      <img className='h-[600px] w-full object-cover' src="\signupwalpaper.jpg" alt="" />
     </div>
     <form onSubmit={apiCallForSignup} className='signupFormSide flex flex-col items-start p-5 pt-0 justify-center  rounded-e-lg' encType='multipart/form-data'>
     <h2 className='text-white text-3xl text-center w-full signupFormHeading'>Signup</h2>
     <input onChange={(evt)=> handleSignUpData(evt)}  className='mt-3 h-[50px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' value={signupData.firstName} name='firstName' placeholder='First name' type="text" />
     <input onChange={(evt)=> handleSignUpData(evt)} className='mt-3 h-[50px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' value={signupData.lastName} name='lastName' placeholder='Last name' type="text" />
     <input onChange={(evt)=> handleSignUpData(evt)} className='mt-3 h-[50px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' value={signupData.email} name='email' placeholder='Email id' type="email" />
    <input onChange={(evt)=> handleSignUpData(evt)}  className='mt-3 h-[50px] w-[400px] bg-black  border-[1px] outline-none text-white border-stone-800 rounded-md ps-2' value={signupData.userName} type="text" placeholder='Username' name='userName'  />
    <input onChange={(evt)=> handleSignUpData(evt)}  className='mt-3  h-[50px] w-[400px] bg-black  border-b-[1px] outline-none text-white border-stone-800 rounded-md ps-2' value={signupData.password} type="text" placeholder='Password' name='password' />
    <input onChange={(evt)=> handleImage(evt)} className='mt-3 h-[50px] w-[400px] p-2 bg-black  border-[1px] outline-none text-white border-stone-800 ' name='image' type="file" />
    <input className='primaryColor px-5 py-3 rounded-md text-white w-full mt-5 cursor-pointer' type="submit" value={"Signup"} />
    <small className='text-white mt-5 '>I already have an Account <Link to={'/login'} className='text-[#673BD0]'>Login</Link></small>
    </form>
    </div>
    </div>
   </div>
  </>
  )
}

export default Signup