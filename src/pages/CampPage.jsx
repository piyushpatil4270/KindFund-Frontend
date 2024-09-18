import React, { useEffect, useState } from 'react';
import img from "../utils/charity6.jpg";
import CircleProgress from '../Components/ProgessCircle';
import ProductCard from '../Components/ProductCard';
import Payments from '../Components/Payments';
import { useParams } from 'react-router-dom';
import { toWords } from 'number-to-words';
import axios from 'axios';
import numeral from 'numeral';

const CampPage = () => {
  const { id } = useParams();
  const userToken=localStorage.getItem("donToken")
  const [products, setProducts] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [showUpdates, setShowUpdates] = useState(false);
  const userId = localStorage.getItem("donId");
  const [amount, setAmount] = useState(0);
  const [isShowing,setShowing]=useState(false)

  const [productQuantities, setProductQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  const handleIncrease = (productId, amount) => {
    setProductQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[productId] || 0) + 1;
      const updatedQuantities = { ...prevQuantities, [productId]: newQuantity }
      return updatedQuantities;
    });

    const prod = products.find((prod) => prod.id === productId);
    if (prod) setAmount(amount => amount + parseInt(prod.amount));
  };

  const handleDecrease = (productId, amount) => {
    setProductQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[productId] || 0) - 1;
      const updatedQuantities = { ...prevQuantities, [productId]: newQuantity }
      return updatedQuantities;
    });

    const prod = products.find((prod) => prod.id === productId);
    if (prod) setAmount(amount => amount - prod.amount);
  };

  const getCampaign = async () => {
    try {
      const res = await axios.post(`http://localhost:5500/campaigns/${id}`, { userId: parseInt(userId) },{headers:{"Authorization":userToken}});
      setCampaign(res.data.campaign);
      setProducts(res.data.products);
      if (res.data.updates){
        setUpdates(res.data.updates)
        setShowUpdates(true)
      };
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  const handleToggleUpdates = () => {
    setShowUpdates(!showUpdates);
  };

  if (!campaign) return <span>Loading...</span>;

  return (
    <div className='w-full h-full p-2'>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='w-full md:w-1/2'>
          <img src={img} alt="Campaign" className='w-full h-full rounded-md' />
        </div>

        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='text-[14px] font-semibold text-gray-800'>{campaign.title}</span>
            <div className='text-white bg-green-600 h-fit w-fit rounded-md text-[12px] px-2 py-1 inline-block'>Women</div>
          </div>

          <div className='flex items-center justify-start gap-4'>
            <CircleProgress percentage={Math.ceil((campaign.currentAmount / campaign.targetAmount) * 100)} />
            <div className='flex flex-col gap-1'>
              <span className='text-[14px] font-semibold text-gray-700'>522,255</span>
              <span className='text-[12px] text-gray-600'>Donors</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[14px] font-semibold text-gray-700'>{"Rupees "+numeral(2552015).format('0.0a')}</span>
              <span className='text-[12px] text-gray-600'>Worth Products Raised</span>
            </div>
          </div>

          <div className='text-[12px] font-medium text-gray-800'>
            <span>{campaign.description}</span>
          </div>

          {showUpdates && <button
            onClick={()=>setShowing(!isShowing)}
            className='bg-orange-500 text-white px-3 py-1 mt-2 rounded text-[12px] hover:bg-blue-600'
          >
            {isShowing?"Hide":"Show Updates"}
          </button>}

          {isShowing && (
            <div className='mt-2 text-[14px] text-gray-800'>
              {updates.map((update,i) => (
                <p key={update.id} className='mb-1 font-semibold text-[15px]'>{i+1}. {update.title}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[50%] gap-1'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} quantity={productQuantities[product.id]} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
          ))}
        </div>
        <div className='flex-1'>
          <Payments campaignId={parseInt(id)} amount={amount} setAmount={setAmount} />
        </div>
      </div>
    </div>
  );
};

export default CampPage;
