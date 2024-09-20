import axios from 'axios';
import React, { useState } from 'react';

const ProductCard = ({ product,setTrigger,trigger }) => {
  const userToken=localStorage.getItem("donToken")
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(product.currentQty);
 const handleUpdate=async()=>{
    try {
        const res=await axios.post("https://kind-fund-backend.vercel.app/products/update",{prodId:parseInt(product.id),quantity:parseInt(currentQuantity)},{headers:{"Authorization":userToken}})
        setIsEditing(false)
        if(res.status===200){
            setTrigger(!trigger)
        }
    } catch (error) {
        console.log(error)
    }
 }
  

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm gap-2">
      <h3 className="text-[14px] font-semibold text-gray-900">{product.name}</h3>
      <div className='flex flex-col gap-2'>
      <p className="text-sm text-gray-700 mt-2">Required Quantity: {product.requiredQty}</p>
      <p className="text-sm text-gray-700">Current Quantity: {isEditing ? (
       <input
       type="number"
       value={currentQuantity}
       onChange={(e) => setCurrentQuantity(e.target.value)}
       className="border border-gray-300 rounded-md p-1"
     />
   ) : (
     product.currentQty
   )}</p>
      </div>
      
      {isEditing ? (
        <div className="mt-2 flex gap-2">
          <button
           
            className="px-[10px] outline-none text-[14px] bg-blue-500 text-white rounded-sm shadow-sm hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-[10px] outline-none text-[14px] bg-gray-300 text-black  rounded-sm shadow-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={()=>setIsEditing(true)}
          className="px-[10px] text-[14px] bg-orange-500  text-white  rounded-sm shadow-sm hover:bg-yellow-600"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ProductCard;
