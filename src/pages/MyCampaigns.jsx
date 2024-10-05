import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CampignCard from "../Components/MyCampaign"
import MyLoader from '../Components/Loader'
const MyCampaigns = () => {
    const [myCamps,setMycamps]=useState(null)
    const [items,setItems]=useState(5)
    const [page,setPage]=useState(1)
    const [total,setTotal]=useState(0)
    const userToken=localStorage.getItem("donToken")
    const userId=localStorage.getItem("donId")
    const getMyCampaigns=async()=>{
        try {
            const res=await axios.post(`https://kind-fund-backend.vercel.app/campaigns/user/${userId}`,{items:items,page:page},{headers:{"Authorization":userToken}})
            setMycamps(res.data.campaigns)
            setTotal(res.data.total)
        } catch (error) {
            console.log("Error: ",error)
        }
    }
    useEffect(()=>{
     getMyCampaigns()
    },[page])
    if(!myCamps) return <div className='w-full h-full flex items-center justify-center'>
    <MyLoader/>
  </div>
  return (
    <div className='w-full h-full flex flex-col gap-4rounded-md p-4'>
    <span className='text-[14px] font-semibold border-b-2 border-b-orange-500 pb-1'>My Campaigns</span>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 items-center justify-center'>
    {myCamps.map((campaign)=>{
        return <CampignCard id={campaign.id} date={campaign.startedOn} title={campaign.title} targetAmount={campaign.targetAmount} raisedAmount={campaign.currentAmount} />
    })}
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
  )
}

export default MyCampaigns
