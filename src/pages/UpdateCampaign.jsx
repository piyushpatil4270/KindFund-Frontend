import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/UpdateProduct';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyLoader from '../Components/Loader';

const CampaignDetailPage = () => {
  const [campaign, setCampaign] = useState(null);
  const [products, setProducts] = useState(null);
  const [trigger, setTrigger] = useState(true);
  const [updateValue, setUpdateValue] = useState('');
  const [error,setError]=useState("")
  const { id } = useParams();
  const campaignId = parseInt(id);
  const userToken=localStorage.getItem("donToken")

  const getMyCampaigns = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/campaigns/${campaignId}`,{headers:{"Authorization":userToken}});
      setCampaign(res.data.campaign);
      setProducts(res.data.products);
    } catch (error) {
      setError(error.message)
    }
  };


  const deactivateCampaign=async()=>{
    try {
       const res=await axios.post(`http://localhost:5500/campaigns/deactivate/${campaignId}`,{},{headers:{"Authorization":userToken}})
       alert(res.data)
       setTrigger(!trigger)
    } catch (error) {
      alert("An error occured try again")
    }
  }
  const handleUpdate = async () => {
    try {
      if (updateValue.trim() === '') {
        alert('Please enter a valid update message');
        return;
      }
      await axios.post('http://localhost:5500/campaigns/addUpdate', {
        campaignId: campaignId,
        title: updateValue,
      },{headers:{"Authorization":userToken}});
      alert('Update added successfully');
      setUpdateValue('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyCampaigns();
  }, [trigger]);
  
  if(error!=="") return <span>You are not authorized to access this campaign</span>
  if (!campaign) return <div className='w-full h-full flex items-center justify-center'>
  <MyLoader/>
</div>

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <h1 className="text-[14px] font-semibold border-b-2 border-orange-500 py-[4px] my-1">
        Campaign Details
      </h1>
      <div className="my-6">
        <div className="mb-4">
          <label className="block text-[16px] font-medium text-gray-700">
            Title:
            <span className="block text-[15px] font-normal text-gray-600">{campaign.title}</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-[16px] font-medium text-gray-700">
            Description:
            <span className="block text-[15px] font-normal text-gray-600">{campaign.description}</span>
          </label>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <input
            type="text"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            placeholder="Enter your update"
            className="w-full max-w-md px-3 py-2 border-b-2 border-orange-500 outline-none text-gray-700 text-[14px] bg-white"
          />
          <button
            onClick={handleUpdate}
            className="bg-orange-500 text-white rounded text-[14px] px-4 py-2 hover:bg-orange-600"
          >
            Update
          </button>
        </div>
      </div>

      <h2 className="text-[16px] font-bold mt-8 mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            setTrigger={setTrigger}
            trigger={trigger}
            product={product}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 mt-6">
      {campaign.isActive?<button className='bg-orange-500 text-white rounded text-[14px] px-[4px] py-[3px] hover:bg-orange-600' onClick={deactivateCampaign}>Deactivate Campaign</button>:<button className='bg-blue-500 text-white rounded text-[14px] px-[4px] py-[3px] hover:bg-blue-600' onClick={()=>{return}}>Campaign Deactivated</button>}
      </div>
    </div>
  );
};

export default CampaignDetailPage;
