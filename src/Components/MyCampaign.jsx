import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toWords } from 'number-to-words';
import numeral from "numeral"


const MyCampaignCard = ({id,date,title,targetAmount,raisedAmount}) => {
   const navigate=useNavigate()

  return (
    <div className='border rounded p-4 shadow-md xs:w-[80%] sm:w-[300px]'>
      <h3 className='font-semibold text-lg mb-2'>
       {title}
      </h3>
    
      
      <p className='text-sm font-semibold'>
       Target Amount: <span className='text font-normal'>{numeral(targetAmount).format('0.0a')+" "+"Rupees"}</span>
      </p>
      <p className='text-sm font-semibold'>
        Raised Amount: <span className='text font-normal'>{numeral(raisedAmount).format('0.0a')+" "+"Rupees"}</span>
      </p>
      <p className='text-sm font-semibold'>
       Started On: <span className='text font-normal'>{date.split("T")[0]}</span>
      </p>

      <button
          className='text mt-1 text-[14px] font-semibold bg-orange-500 text-white px-[5px]  rounded-sm'
          onClick={()=>navigate(`/my-campaigns/${id}`)}
        >
         View
        </button>
        
    </div>
  );
};

export default MyCampaignCard ;
