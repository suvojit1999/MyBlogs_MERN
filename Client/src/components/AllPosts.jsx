import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from '../_context/SearchContext';

const AllPosts = () => {
    const [value, setValue] = useState('1');
    const [AllPosts, setAllPosts] = useState([]);
    const [SearchList, setSearchList] = useState([]);
    const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
    const { Search, setSearch } = useContext(SearchContext)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fetch posts when component mounts
    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const response = await fetch('https://myblogs-mern-eg1e.onrender.com/getData');
        // const response = await fetch('http://localhost:5000/getData');
        const data = await response.json();
        setAllPosts(data);
        console.log(data);
    };

    useEffect(() => {
        if (Search) {
            setSearchList(AllPosts.filter((item) => item.title.includes(Search)))
        }
    }, [Search])


    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="All Blogs" value="1" />
                            <Tab label="My Blogs" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className='w-full flex flex-col justify-start items-center gap-3'>
                        {
                            Search ?
                                (
                                    SearchList.map((item, key) => (
                                        <Post key={key} item={item} />
                                    ))
                                )
                                :
                                (
                                    AllPosts.filter((i)=> i.status == 'accepted').map((item, key) => (
                                        <Post key={key} item={item} />
                                    ))
                                )
                        }
                    </TabPanel>
                    <TabPanel value="2">
                        {
                            user ?
                                <div className='w-full flex flex-col justify-start items-center gap-3'>
                                    {
                                        (AllPosts.filter((i) => i.email === user.email).length == 0) ?
                                            <div>You have not created any blog posts yet</div> :

                                            AllPosts.filter((i) => i.email === user.email).map((item, key) => (
                                                <Post key={key} item={item} />
                                            ))
                                    }
                                </div>
                                :
                                <div className='w-full flex flex-col justify-start items-center gap-1'>Log in to see your blogs</div>
                        }
                    </TabPanel>
                </TabContext>
            </Box>

            <div></div>
        </div>
    );
}

export default AllPosts;
