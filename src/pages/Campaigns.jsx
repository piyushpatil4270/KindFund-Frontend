import React, { useEffect, useState } from 'react';
import CampaignCard from '../Components/CampaignCard';
import axios from 'axios';
import MyLoader from '../Components/Loader';

const Campaigns = () => {
  const [category, setCategory] = useState("");
  const [campaigns, setCampaigns] = useState(null);
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const userToken=localStorage.getItem("donToken")
  const [items,setItems]=useState(5)
  const getCampaigns = async () => {
    try {
      const res = await axios.post(`https://charity-frontend-orcin.vercel.app/campaigns/all/${category}`,{items:items,page:page},{headers:{"Authorization":userToken}});
      setCampaigns(res.data.campaigns);
      setTotal(res.data.total)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [category,page]);

  if (!campaigns) return <div className='w-full h-full flex items-center my-2 justify-center'>
  <MyLoader/>
</div>

  return (
    <div className='w-full h-full flex flex-col gap-4 rounded-md p-4'>
      <div className='flex flex-col  pb-1 sm:flex-row gap-4 items-center  justify-center'>
        <div className='w-full sm:w-[50%] text-start sm:text-left '>
          <span className='sm:text-[14px] w-full  font-semibold border-b-2 border-b-orange-500 pb-1'>
            Explore Campaigns
          </span>
        </div>
        <div className='flex items-center gap-4 w-full sm:w-[50%]'>
          <span className='text-[13px] sm:text-[15px]  w-[30%] sm:w-[20%]'>Campaign Type</span>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='bg-white text-[13px] sm:text-[15px]   border w-full sm:w-[70%] border-orange-500 text-gray-700 py-1 rounded focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option value='children'>Children</option>
            <option value='Women'>Women</option>
            <option value='Hunger'>Hunger</option>
            <option value='Education'>Education</option>
            <option value='Animals'>Animals</option>
            <option value='Disaster'>Disaster</option>
            <option value=''>Others</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 items-center justify-center'>
        {campaigns.map((campaign) => (
          <CampaignCard
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
      <div className="w-full flex justify-between self-end">
     <button className={`${page===1?'bg-slate-50':'bg-slate-300'} p-1`} onClick={()=>{
      if(page==1) return 
      setPage(page-1)
     }}>Prev</button>
     <button className={`${page===Math.ceil(total/items)?'bg-slate-50':'bg-slate-300'} p-1`} onClick={()=>{
      console.log(Math.ceil(total/items))
      if(page===Math.ceil(total/items))return 

      setPage(page+1)
     }}>Next</button>
      </div>
    </div>
  );
};

export default Campaigns;
