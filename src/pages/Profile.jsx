import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import PieChart from '../Components/Piechart';
import Barchart from '../Components/Barchart';
import MyLoader from '../Components/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [user,setUser]=useState(null)
  const [username,setUsername]=useState("")
  const [useremail,setUseremail]=useState("")
  const [newPassword, setNewPassword] = useState('');
  const [totalDonations, setTotalDonations] = useState(0); 
  const [monthlyData,setMonthlyData]=useState([])
  const [data,setData]=useState([])
  const [totalLaunched,setLaunched]=useState(0)
  const userToken=localStorage.getItem("donToken")

  const userId=localStorage.getItem("donId")
  const fetchUser=async()=>{
    try {
        const res=await axios.post("https://kind-fund-backend.vercel.app/auth/getUser",{userId:parseInt(userId)},{headers:{"Authorization":userToken}})
        setUser(res.data)
        setUsername(res.data.name)
        setUseremail(res.data.email)
    } catch (error) {
        console.log(error)
    }
  }
  const fetchUserData=async()=>{
    try {
        const res=await axios.post("https://kind-fund-backend.vercel.app/campaigns/getUserData",{userId:parseInt(userId)},{headers:{"Authorization":userToken}})
        setLaunched(res.data?.totalCamps===null?0:res.data.totalCamps)
        setTotalDonations(res.data?.totalDons===null?0:res.data.totalDons)
        setData(res.data.data)
        setMonthlyData(res.data.monthly)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
  }
  const handlePasswordChange = async() => {
    try {
        const res=await axios.post("https://kind-fund-backend.vercel.app/auth/changePassword",{userId:parseInt(userId),oldPassword:oldPassword,newPassword:newPassword},{headers:{"Authorization":userToken}})
    if(res.status<400){
        alert(res.data)
        setOldPassword("")
        setNewPassword("")
    }
    } catch (error) {
        console.log(error)
    }
    
  };
  useEffect(()=>{
   fetchUser()
   fetchUserData()
  },[])

 

 
  if(!user) return <div className='w-full h-full flex items-center justify-center'>
  <MyLoader/>
</div>
  return (
    <div className="p-4">
      <h1 className="text-[16px] font-semibold border-b-2 border-b-orange-500 pb-1">Profile</h1>
      <div className="flex flex-col gap-4 mt-4">
      
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-[50%]">
            <label className="text-[15px] font-medium">Username:</label>
            <input
              type="text"
              value={username}
              disabled
              className="border-0  outline-none p-1 w-full text-[16px] font-semibold"
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <label className="text-[15px] font-medium">Email:</label>
            <input
              type="email"
              value={useremail}
              disabled
              className="border-0  outline-none p-1 w-full text-[16px] font-semibold "
            />
          </div>
        </div>

   
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-[50%]">
            <label className="text-[15px] font-medium">Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border-0 border-b-2 border-b-orange-500 outline-none p-1 w-full text-sm"
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <label className="text-[15px] font-medium">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-0 border-b-2 border-b-orange-500 outline-none p-1 w-full text-sm"
            />
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="bg-orange-500 text-white text-[12px] sm:text-[14px] p-[2px] sm:p-2 rounded w-[20%] self-end"
        >
          Change Password
        </button>
      </div>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-[14px] font-semibold">Total Campaigns Launched</h2>
          <span className="text-[24px] font-bold">{totalLaunched}</span>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-[14px] font-semibold">Total Donations Made</h2>
          <span className="text-[24px] font-bold">{totalDonations}</span>
        </div>
      </div>

     <div className='flex flex-col  gap-1 w-full items-center justify-center py-2'>
      <span className='text-[18px] font-semibold'>Donation Data</span>
     <div className='w-full flex flex-col sm:flex-row items-center gap-4 justify-center'>
     <PieChart data={data} />
     <Barchart monthlyData={monthlyData} />
     </div>

     </div>
     
    </div>
  );
};

export default Profile;
