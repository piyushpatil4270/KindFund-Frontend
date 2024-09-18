import './App.css';
import {Routes,Route} from "react-router-dom"
import Signup from './pages/Signup';
import Signin from "./pages/Signin"
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Campaign from './pages/CreateCampaign';
import Campaigns from './pages/Campaigns';
import CampaignCard from './Components/CampaignCard';
import CampPage from './pages/CampPage';
import Mydonations from './pages/Mydonations';
import MyCampaigns from './pages/MyCampaigns';
import UpdateCampaign from './pages/UpdateCampaign';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
function App() {
  const [isAuth,setIsAuth]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  useEffect(()=>{
   const currentUser=localStorage.getItem("donToken")
   if(currentUser)setIsAuth(true)
    const admin=localStorage.getItem("isAdmin")
  if(admin)setIsAdmin(true)
  },[])
  return (
    <div className="App element w-full h-screen">
    {!isAuth?(
      <Routes>
       <Route path='/' element={<Signup/>}/>
       <Route path='/signin' element={<Signin  setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />}  /> 


      </Routes>
    ):(
    <>
    <Navbar isAdmin={isAdmin} setIsAuth={setIsAuth}/>
    <div className='w-full min-h-[calc(100vh-65px)]'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/startcampaign' element={<Campaign/>}   />
      <Route path='/explore-campaigns' element={<Campaigns/>}   />
      <Route path='/campaigns/:id' element={<CampPage/>}   />
      <Route path='/my-donations' element={<Mydonations/>}  />
      <Route path='/my-campaigns' element={<MyCampaigns/>} />
      <Route path='/my-campaigns/:id' element={<UpdateCampaign/>} />
      <Route path='/profile' element={<Profile/>} />
      {isAdmin &&  <Route path='/admin' element={<Admin/>} /> }
    </Routes>
    </div>
    </>
    )}
    </div>
  );
}

export default App;
