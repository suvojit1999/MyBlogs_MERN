import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';

const Post = ({ item }) => {
    const navigate = useNavigate();
    const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

    const createSanitizedHTML = (htmlContent) => {
        return { __html: DOMPurify.sanitize(htmlContent) };
    };

    return (
        <div className='lg:w-[96%] md:w-[96%] w-[99%] lg:min-h-[200px] md:min-h-[200px] min-h-[300px] flex justify-center items-start md:justify-start md:items-center border-2 hover:bg-neutral-200 gap-4 px-3 lg:flex-row md:flex-row flex-col cursor-pointer' onClick={() => navigate(`/blog/${item?._id}`)}>
            <img src={item?.imageUrl} width={360} height={100} className='rounded-lg lg:min-w-[360px] md:min-w-[360px] w-[360px] h-[180px] object-cover mt-2 md:mt-0 lg:mt-0'></img>
            <div className='h-[90%] flex flex-col pt-2'>
                <h2 className='font-bold lg:text-2xl md:text-2xl text-xl'>{item?.title}</h2>
                <div className='flex justify-start items-center gap-2'>
                    <span className='font-semibold text-gray-400 text-md'>{item?.user}</span>
                    <ul class="list-disc pl-5 flex justify-center items-center">
                        <li className=' text-gray-400 text-sm'>{new Date(item?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</li>
                    </ul>
                </div>
                <div className='text-preview text-gray-700' dangerouslySetInnerHTML={createSanitizedHTML(item?.content)} />

                {
                    (user?.email == item.email) ?
                        <div className={`font-semibold text-md ${(item.status == 'accepted') ? 'text-teal-500' : 'text-red-500'} `}>Status: {item.status}</div>
                        :
                        null
                }

            </div>
        </div>
    )
}

export default Post
