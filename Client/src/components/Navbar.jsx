import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { loginWithRedirect, user, logout , isAuthenticated} = useAuth0();
    const navigate = useNavigate()

    

    return (
        <div className='flex justify-between md:px-7 lg:px-7 px-4 py-5 items-center'>
            <h2 className='font-bold lg:text-3xl md:text-2xl text-xl cursor-pointer' onClick={()=> navigate('/')}>MyBlogs</h2>
            {/* {isAuthenticated ? <h2 className='text-gray-400 font-semibold text-lg'>Welcome {user?.nickname}</h2> : null} */}
            {
                isAuthenticated ? (
                    <div className='flex lg:gap-4 md:gap-4  gap-2'>
                        <button className='border-teal-400 border-2 lg:px-3 md:px-3 px-2 py-1 md:py-2 lg:py-2 rounded-md text-teal-400 font-semibold lg:text-md md:text-md text-sm' onClick={()=> navigate('/CreateBlog')} >Create Blog</button>
                        <button className='border-teal-400 border-2 bg-teal-400 lg:px-3 md:px-3 px-2 py-1 md:py-2 lg:py-2 rounded-md text-white font-semibold lg:text-md md:text-md text-sm' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>
                    </div>
                )
                :
                (
                    <div>
                        <button className='border-teal-400 border-2 bg-teal-400 px-3 py-1 md:py-2 lg:py-2 rounded-md text-white font-semibold lg:text-md md:text-md text-sm' onClick={() => loginWithRedirect()}>Log In</button>
                    </div>
                )
            }
        </div>
    );
}

export default Navbar;
