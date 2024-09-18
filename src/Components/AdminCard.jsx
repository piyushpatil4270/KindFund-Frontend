import axios from 'axios';
import React from 'react';
import {saveAs} from "file-saver"

const CampaignCard = ({id,name,trigger,setTrigger,title,email,startedOn,imgUrl}) => {
  const userToken=localStorage.getItem("donToken")
  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : title;
  };
  const handleApprove=async()=>{
    try {
        const res=await axios.post("http://localhost:5500/campaigns/approve",{campaignId:parseInt(id)},{headers:{"Authorization":userToken}})
        alert("Campaign verified")
        setTrigger(!trigger)
    } catch (error) {
        alert("An error occured try again")
    }
    
  }
  const downloadImage = () => {
    saveAs("http://localhost:5500/uploads/"+imgUrl, 'application.jpg'); 
  };
  return (
    <div className='border rounded p-4 shadow-md w-[300px]'>
      <h3 className='font-semibold text-lg mb-2'>
        {truncateTitle(title)}
      </h3>
      <p className='text-sm text-gray-500 mb-2'>Started by: {name}</p>
     
     
      <p className='text-xs text-gray-400'>Started on: {new Date(startedOn).toLocaleDateString()}</p>
      <div className='flex gap-2'>
      <button
          className='text mt-1 text-[12px] font-semibold bg-orange-500 text-white px-[5px]  rounded-sm'
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className='text mt-1 text-[12px] font-semibold bg-blue-500 text-white px-[5px]  rounded-sm'
          onClick={downloadImage}
        >
        Download Application
        </button>
      </div>
      

    </div>
  );
};

export default CampaignCard;
