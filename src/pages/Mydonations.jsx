import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Donation from "../Components/Donation"

const Mydonations = () => {
    const [donations,setDonations]=useState(null)
    const [items,setItems]=useState(5)
    const [total,setTotal]=useState(0);
    const [page,setPage]=useState(1)
    const userId=localStorage.getItem("donId")
    const userToken=localStorage.getItem("donToken")
    const getDonations=async()=>{
        try {
            const res=await axios.post(`https://charity-vercel-4ebc.vercel.app/donations/${userId}`,{items:items,page:page},{headers:{"Authorization":userToken}})
        setDonations(res.data.donations)
        setTotal(res.data.total)  
        } catch (error) {
            console.log("Error: ".error)
        }
        
    }
    useEffect(()=>{
    getDonations()
    },[page])
    if(!donations) return <span>Loading...</span>
  return (
    <div className='w-full h-full flex flex-col gap-4 rounded-md p-4'>
    <span className='text-[14px] font-semibold border-b-2 border-b-orange-500 pb-1'>My Donations</span>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 items-center justify-center'>
       {donations.map((donation)=>{
        return <Donation title={donation.campaign.title} date={donation.date} amount={donation.amount} />
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

export default Mydonations
