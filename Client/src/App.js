import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import AllPosts from './components/AllPosts';
import SearchBar from './components/SearchBar';
import {SearchContext} from './_context/SearchContext'
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';

function App() {
  const { loginWithRedirect, user, logout , isAuthenticated} = useAuth0();
  const [Search, setSearch] = useState('')
  useEffect(() => {
    if(user?.name !== undefined){
      toast(`Welcome ${user?.name}`)
    }
  }, [isAuthenticated])



  return (
    <SearchContext.Provider value={{Search, setSearch}}>
    <div>
      <Navbar/>
      
      

    <Routes>
      <Route path='/' element={
        <div>
          <SearchBar/>
          <AllPosts/>
          <ToastContainer />
        </div>
        }/>
      <Route path='/Blog/:id' element={<Blog/>}/>
      <Route path='/CreateBlog' element={<CreateBlog/>}/>
    </Routes>

      


    </div>
    </SearchContext.Provider>
  );
}

export default App;
