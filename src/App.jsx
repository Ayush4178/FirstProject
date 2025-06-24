import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import React from 'react'
import authService from  './appwrite/auth'
import {login,logout} from './store/authSlice'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {
 const[loading,setLoading] = useState(true);
 const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser().then((userData)=>{
    if(userData) {
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
},[])

return !loading ? (
  <div className="min-h-screen flex flex-col justify-between items-center bg-gray-400">
    <Header />
    <div className="flex-grow"><Outlet/></div>
    <Footer />
  </div>
) : null;

}

export default App
