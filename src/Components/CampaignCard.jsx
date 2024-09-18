import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({id,name,title,email,startedOn,currentAmount,targetAmount}) => {
  const navigate=useNavigate()
  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : title;
  };

  const percentageCollected = Math.ceil((currentAmount / targetAmount)*100)

  return (
    <div className='border rounded p-4 shadow-md xs:w-[80%] sm:w-[300px]'>
      <h3 className='font-semibold text-[16px] mb-2'>
        {truncateTitle(title)}
      </h3>
      <p className='text-[14px] text-gray-500 mb-2'>Started by: {name}</p>
      <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
        <div
          className='bg-gradient-to-r from-orange-600 to-orange-400 h-2 rounded-full'
          style={{ width: `${percentageCollected}%` }}
        ></div>
      </div>
      <p className='text-[12px] font-semibold'>
        Raised: <span className='text-black text-[12px] font-normal'>{percentageCollected}% of the total</span>
      </p>
      <p className='text-xs text-gray-400'>Started on: {new Date(startedOn).toLocaleDateString()}</p>
      <button
          className='text mt-1 text-[14px] font-semibold bg-orange-500 text-white px-[5px]  rounded-sm'
          onClick={()=>navigate(`/campaigns/${id}`)}
        >
          Visit 
        </button>
    </div>
  );
};

export default CampaignCard;
