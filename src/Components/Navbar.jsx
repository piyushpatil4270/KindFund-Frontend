import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({isAdmin,setIsAuth}) => {
  const navigate=useNavigate()
  const Logout=()=>{
    localStorage.removeItem("donId")
    localStorage.removeItem("donToken")
    localStorage.removeItem("isAdmin")
    setIsAuth(false)
    navigate("/")
  }
  return (
    <div className='w-full  h-[100px]  sm:h-[75px] flex flex-col xs:p-[2px] sm:p-2 gap-1 justify-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-md px-6'>
      <div className='text-white font-bold text-[18px]'>Charityyy</div>
      <div className='flex justify-between'>
        <div className='flex items-center justify-between sm:gap-4 gap-1 '> 
        <Link to="/" className='text-white p-1 text-[10px]  my-1  sm:text-[14px]  hover:underline'>Home</Link>
        <Link to="/startcampaign" className='text-white p-1  my-1  text-[10px] sm:text-[14px]  hover:underline'>Start</Link>
        <Link to="/explore-campaigns" className='text-white  my-1  p-1 text-[10px] sm:text-[14px] hover:underline'>Explore </Link>
        <Link to="/my-donations" className='text-white p-1 my-1 text-[10px] sm:text-[14px] hover:underline'>Donations</Link>
        <Link to="/my-campaigns" className='text-white p-1  my-1  text-[10px] sm:text-[14px] hover:underline'>Launched </Link>
        {isAdmin && <Link to="/admin" className='text-white p-1  my-1  text-[10px] sm:text-[14px] hover:underline'>Admin</Link>}
        <Link to="/profile" className='text-white p-1  my-1  text-[10px] sm:text-[14px] hover:underline'>Profile</Link>
        </div>
        <div className='p-1'>
         <button className='bg-white py-[1px] px-[3px] rounded-sm text-[12px]  text-black hover:bg-slate-400 hover:text-white'  onClick={Logout}>Logout</button>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
