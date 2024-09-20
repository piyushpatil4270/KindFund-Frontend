import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
   try {
    if(username===""||email===""||password===""){
        alert("All fields are required")
        return
       }
       const res=await axios.post("https://kind-fund-backend.vercel.app/auth/signup",{name:username,email:email,password:password})
       if(res.status===200||res.status===202){
        alert(res.data)
       }
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500'>
      <div className='w-w-[80%] xs:w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] h-fit xs:p-4 sm:p-2 flex flex-col gap-4 bg-white rounded-lg shadow-lg'>
        <div className='w-full flex p-2 justify-start items-center'>
          <span className='text-[18px] font-bold border-0 border-b-2 pb-2 border-b-orange-600'>Sign Up</span>
        </div>
        <div className='w-full flex p-2 items-center'>
          <span className='w-[30%] sm:w-[20%] text-[12px] sm:text-[14px]'>Name</span>
          <input
            className='flex-1 bg-orange-50 mx-2 outline-none border-0 border-b border-b-orange-500'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='w-full flex p-2 items-center'>
          <span className='w-[30%] sm:w-[20%] text-[12px] sm:text-[14px]'>Email</span>
          <input
            className='flex-1 bg-orange-50 mx-2 outline-none border-0 border-b border-b-orange-500'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className='w-full flex p-2 items-center'>
          <span className='w-[30%] sm:w-[20%] text-[12px] sm:text-[14px]'>Password</span>
          <input
            className='flex-1 bg-orange-50 mx-2 outline-none border-0 border-b border-b-orange-500'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='w-full flex p-2 gap-4 justify-center items-center'>
          <button className='bg-orange-600 hover:bg-orange-700 text-white text-[15px] px-4 py-2 rounded-full shadow-md' onClick={handleSignup}>
            Sign Up
          </button>
          <Link to="/signin" className='text-[14px] text-blue-700 border-0 border-b border-b-blue-700'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
