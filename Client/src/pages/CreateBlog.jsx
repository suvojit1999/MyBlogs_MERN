import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const CreateBlog = () => {
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState('');
  const [loading, setLoading] = useState(false)

  const uploadPost = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      toast('Title or Content is missing!')
    }
    else {

      const data = new FormData();
      data.set('title', title);
      data.set('content', content);
      data.set('file', files[0]);
      data.set('email', user?.email);
      data.set('user', user?.name)

      try {
        setLoading(!loading)
        const response = await fetch('http://localhost:5000/CreatePost', {
          method: 'POST',
          body: data,
          credentials: 'include',
        })
        // const response = await fetch('https://my-blogs-mern.vercel.app/CreatePost', {
        //   method: 'POST',
        //   body: data,
        //   credentials: 'include',
        // })
        const responseData = await response.json();
        console.log(responseData.message)
        // toast(responseData.message)


        if (response.ok) {
          setLoading(!loading)
          console.log('Post uploaded successfully');
          toast('Post uploaded successfully')
          navigate('/');
        }
        else {
          setLoading(!loading)
          console.error('Error uploading post:', responseData.message);
          toast('Error uploading post:', responseData.message)
        }
      } catch (err) {
        setLoading(!loading)
        console.error('Failed to fetch:', err);
        toast('Failed to fetch:', err)
      }
    }
  }

  return (
    <div className='w-[96%] flex flex-col m-auto gap-5'>
      <h2 className='text-3xl font-bold text-teal-600'>Create Your Blog</h2>
      <form className='flex flex-col gap-4 relative'>
        <input type="text" name="title" id="title" placeholder='Enter Your Blog Title' className='bg-white px-3 py-1 w-[100%] border-[1px] border-gray-600 text-left pr-10' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="file" name="image" id="image" onChange={e => setFiles(e.target.files)} />
        <ReactQuill te="snow" value={content} onChange={setContent} />
        <button
          type="submit"
          className={`absolute bottom-[-50px] right-0 border-2 px-3 py-1 md:py-2 lg:py-2 rounded-md text-white font-semibold lg:text-md md:text-md text-sm ${user ? 'border-teal-400 bg-teal-400' : 'border-teal-600 bg-teal-600'}`} disabled={!user} onClick={(e) => uploadPost(e)}>{!loading ? 'Upload Blog' : 'Uploading...'}</button>

      </form>
    </div>
  )
}

export default CreateBlog
