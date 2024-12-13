import axios from 'axios'
import React, { useState } from 'react'

const CreatePost = ({closeBoxFn}) => {
    // USESTAE FOR POST FOMR DATA 
    const [post, setpost] = useState({
        title : '',
        dipscription : '',
    })
    // FUCNTION FOR HANDLING POST DATA 
    const handlePostData = async (evt)=> {
        setpost({...post, [evt.target.name] : evt.target.value})
    }
    // USESTATE FOR IMAGE STORAGE 
    const [imageForSend, setimageForSend] = useState({})
    const [image, setimage] = useState()
    const handleImage = (evt)=> {
        const file = evt.target.files[0]
        setimageForSend(file)
        setimage(URL.createObjectURL(file))
    }
    // FUNCTION FOR API CALL 
    const apiForCreatePost = async(evt)=> {
        evt.preventDefault()
        const finalData = new FormData()
        finalData.append('title',post.title )
        finalData.append('dipscription', post.dipscription)
        finalData.append('image',imageForSend )
        const response = await axios.post('http://localhost:3000/api/v1/post/cratePost',finalData ,{withCredentials : true} )
        setpost({
            title : '',
            dipscription : '',
        })
        setimageForSend(' ')

    }
  return (
    <form onSubmit={apiForCreatePost} className='h-[400px] w-full  rounded-lg ' encType='multipart/form-data'>
        <i onClick={closeBoxFn} className="ri-close-line absolute top-0 right-0 text-2xl p-3"></i>
        <input required onChange={(evt)=> handleImage(evt)} className='flex flex-col items-start p-5  justify-center bg-transparent border-[1px] border-stone-800 w-full rounded-lg outline-none mb-4' type="file" />
         
        {image && imageForSend.type.startsWith('image') && (
                <img className='h-[200px] w-full object-contain mb-4' src={image} alt="Selected" />
            )}
            {image && imageForSend.type === 'video/mp4' && (
                <video className='h-[200px] w-full object-contain mb-4' controls>
                    <source src={image} type="video/mp4" />
                </video>
            )}
        {/* <input onChange={(evt)=> handlePostData(evt)} name='title' value={post.title} required className='flex flex-col items-start p-5  justify-center bg-transparent border-[1px] border-stone-800 w-full rounded-lg outline-none mb-4' placeholder='Title of post'  type="text" /> */}
        <textarea onChange={(evt)=> handlePostData(evt)} name='dipscription'value={post.dipscription} className='flex flex-col items-start p-5   justify-center bg-transparent border-[1px] border-stone-800 w-full rounded-lg outline-none mb-4' placeholder='Your thoughts'  type="text" />
        <input onClick={closeBoxFn} className='primaryColor rounded-md px-5 py-2 text-white w-full mt-5 cursor-pointer' type="submit" value={'Post'} />
    </form>
  )
}

export default CreatePost