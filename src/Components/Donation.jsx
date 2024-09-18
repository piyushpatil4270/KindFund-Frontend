import React from 'react';
import Pdf from "../Components/Pdf"
import numeral from 'numeral';

const CampaignCard = ({date,title,amount}) => {


  return (
    <div className='border rounded p-4 shadow-md w-full sm:w-[300px]'>
      <h3 className='font-semibold text-lg mb-2'>
       {title}
      </h3>
    
      
      <p className='text-sm font-semibold'>
       Amount: {numeral(amount).format('0.0a')+" "+"Rupees"}
      </p>
      <p className='text-xs text-gray-400'>Donated on: {date.split("T")[0]}</p>
      <button
          className='text mt-1 text-[14px] font-semibold bg-orange-500 text-white px-[5px]  rounded-sm'
          
        >
          <Pdf date={date} title={title} amount={amount} />
        </button>
        
    </div>
  );
};

export default CampaignCard;
