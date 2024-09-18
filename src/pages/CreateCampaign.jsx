import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignDetails = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file,setFile]=useState(null)
  const userToken=localStorage.getItem("donToken")
  const handleSubmit = async () => {
    try {
      if(!file){
        alert("Please attach the application document")
        return
      }
      const userId = parseInt(localStorage.getItem('donId'));
      const formData=new FormData()

      formData.append('userId', userId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append("file",file)
      products.forEach((product, index) => {
        formData.append(`prods[${index}][name]`, product.name);
        formData.append(`prods[${index}][quantity]`, product.quantity);
        formData.append(`prods[${index}][amount]`, product.amount);
      });

      const res = await axios.post('http://localhost:5500/campaigns/create',formData,{headers:{"Authorization":userToken}});
      console.log('The data from campaign creation is ', res.data);
      if (res.status === 202) {
        alert(res.data);
        navigate('/');
      } else if (res.status === 201) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    if (productName && productQuantity && productAmount) {
      setProducts([
        ...products,
        { name: productName, quantity: productQuantity, amount: productAmount },
      ]);
      setProductName('');
      setProductQuantity('');
      setProductAmount('');
    }
  };

  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = products.filter((_, index) => index !== indexToRemove);
    setProducts(updatedProducts);
  };

  return (
    <div className='w-full flex flex-col gap-4  rounded-md p-4'>
      <span className='text-[14px] font-semibold border-b-2 border-b-orange-500 pb-1'>
        Campaign Details
      </span>
      <div className='w-full flex items-center gap-2'>
        <span className='text-[13px] w-[20%]'>Title</span>
        <input
          className='w-[50%]  outline-none border-b border-b-orange-500 p-1'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className='w-full flex gap-2'>
        <span className='text-[13px] w-[20%]'>Description</span>
        <textarea
          rows={4}
          className='w-[50%]  outline-none border-b border-b-orange-500 p-1'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='w-full flex items-center gap-2'>
        <span className='text-[13px] w-[20%]'>Application File</span>
        <input
          className='w-[50%] outline-none border-b border-b-orange-500 p-1'
          type='file'
          
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className='w-full flex gap-2'>
        <span className='text-[13px] w-[20%]'>Campaign Type</span>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className='w-[50%] bg-white border border-orange-500 text-gray-700 py-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 p-1'
        >
          <option value='children'>Children</option>
          <option value='Women'>Women</option>
          <option value='Hunger'>Hunger</option>
          <option value='Education'>Education</option>
          <option value='Animals'>Animals</option>
          <option value='Disaster'>Disaster</option>
          <option value='Others'>Others</option>
        </select>
      </div>

  
      <div className='w-full flex gap-2'>
        <span className='text-[13px] w-[20%]'>Product Name</span>
        <input
          className='w-[30%]  outline-none border-b border-b-orange-500 p-1'
          type='text'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className='w-full flex gap-2'>
        <span className='text-[13px] w-[20%]'>Quantity</span>
        <input
          className='w-[30%]  outline-none border-b border-b-orange-500 p-1'
          type='number'
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
      </div>
      <div className='w-full flex gap-2'>
        <span className='text-[13px] w-[20%]'>Amount</span>
        <input
          className='w-[30%] bg-orange-50 outline-none border-b border-b-orange-500 p-1'
          type='number'
          value={productAmount}
          onChange={(e) => setProductAmount(e.target.value)}
        />
      </div>
      <div className='w-full flex gap-2'>
        <button
          className='text-[13px] font-semibold bg-orange-500 text-white px-3 py-1 rounded hover:bg-blue-600'
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Display Added Products */}
      {products.length > 0 && (
        <div className='w-full mt-4'>
          <h4 className='text-[14px] font-semibold'>Added Products</h4>
          {products.map((product, index) => (
            <div
              key={index}
              className='flex justify-between items-center p-2 bg-orange-100 rounded mt-2'
            >
              <div className='flex gap-4 items-center text-[13px]'>
                <span>{product.name}</span>
                <span>Qty: {product.quantity}</span>
                <span>Amount: {product.amount}</span>
              </div>
              <button
                className='text-[12px] text-red-600 font-semibold'
                onClick={() => handleRemoveProduct(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className='w-full flex gap-2 mt-2'>
            <button
              className='text-[13px] font-semibold bg-orange-500 text-white px-3 py-1 rounded hover:bg-blue-600'
              onClick={handleSubmit}
            >
              Create Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
