import React, { useEffect, useState } from 'react';
import CampaignCard from '../Components/AdminCard';
import axios from 'axios';

const Campaigns = () => {
  const userToken=localStorage.getItem("donToken")
   const [campaigns, setCampaigns] = useState(null);
   const [trigger,setTrigger]=useState(true)
  const getCampaigns = async () => {
    try {
      const res = await axios.get(`https://charity-vercel.vercel.app/campaigns/admin`,{headers:{"Authorization":userToken}});
      setCampaigns(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [trigger]);

  if(!campaigns) return <div className='w-full h-full flex flex-col gap-4rounded-md p-4'>
    <span>Loading...</span>
  </div>

  if(campaigns.length===0) return <div className='w-full h-full flex flex-col gap-4rounded-md p-4'>
  <span>No Campaigns For Verification</span>
  </div>
  

  return (
    <div className='w-full h-full flex flex-col gap-4 rounded-md p-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mb-6'>
        
       
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {campaigns.map((campaign) => (
          <CampaignCard
           imgUrl={campaign.document}
            trigger={trigger}
            setTrigger={setTrigger}
            key={campaign.id}
            title={campaign.title}
            name={campaign.user.name}
            email={campaign.user.email}
            currentAmount={campaign.currentAmount}
            id={campaign.id}
            targetAmount={campaign.targetAmount}
            startedOn={campaign.startedOn}
          />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
