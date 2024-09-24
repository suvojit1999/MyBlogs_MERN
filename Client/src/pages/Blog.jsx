import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Blog = () => {
    const [postData, setPostData] = useState('')
    const navigate = useNavigate();
    const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

    const params = useParams()
    useEffect(() => {
        console.log(params.id)
        GetPostData(params)
    }, [])

    const createSanitizedHTML = (htmlContent) => {
        return { __html: DOMPurify.sanitize(htmlContent) };
    };

    //Get one post data
    const GetPostData = async (params) => {
        const response = await fetch(`http://localhost:5000/blog/${params.id}`);
        // const response = await fetch(`https://my-blogs-mern.vercel.app/blog/${params.id}`);
        const data = await response.json();
        setPostData(data);
        console.log(data);
    }

    const DeletePost = async () =>{
        try {
            // const response = await fetch(`https://my-blogs-mern.vercel.app/deletepost/${params.id}`, {
            //   method: 'DELETE',
            //   credentials: 'include',
            // });
            const response = await fetch(`http://localhost:5000/deletepost/${params.id}`, {
              method: 'DELETE',
              credentials: 'include',
            });
            const responseData = await response.json();
        
            if (response.ok) {
              toast.success('Post deleted successfully');
              navigate('/')
            } else {
              toast.error(`Error deleting post: ${responseData.message}`);
            }
          } catch (err) {
            console.error('Failed to fetch:', err);
            toast.error('Failed to fetch:', err.message);
          }
    }

    return (
        <div className='flex flex-col justify-start items-center gap-4'>
            {
                (user && user.email == postData.email) ?
                    <div className='w-[96%] flex justify-end my-2'>
                        <button className='border-teal-400 border-2 bg-teal-400 px-3 py-1 md:py-2 lg:py-2 rounded-md text-white font-semibold lg:text-md md:text-md text-sm' onClick={()=>{DeletePost()}}>Detele this post</button>
                    </div>
                    :
                    null
            }

            <img src={postData.imageUrl} alt="" width={100} height={100} className='w-[96%] lg:h-[350px] md:h-[350px] h-[200px] object-cover rounded-lg border-2 ' />
            <div className='w-[96%] flex flex-col justify-center items-start'>
                <div className='text-gray-500'>Written by <b>{postData.user}</b> on {new Date(postData?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <h2 className='md:text-5xl lg:text-5xl text-3xl my-6 font-bold tracking-wider font-serif'>{postData.title}</h2>
                <div className='md:text-xl lg:text-xl text-lg text-gray-600' dangerouslySetInnerHTML={createSanitizedHTML(postData.content)} />

            </div>
            {
                (user && user.email == postData.email) ?
                    <div className='flex justify-end w-[96%] mt-8 mb-4'>
                        <span className={`font-semibold text-lg ${(postData.status == 'accepted') ? 'text-teal-500' : 'text-red-500'} `}>Status: {postData?.status}</span>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default Blog
