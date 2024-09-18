import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const Payments = ({campaignId,amount,setAmount}) => {
  const [error, setError] = useState('');
  const userToken=localStorage.getItem("donToken")

  const handleIncrease = (value) => {
    if(!amount) setAmount(value)
    else setAmount((prevAmount) => prevAmount + value);
  };
  console.log("Updated amount is ",amount)
  const createOrder = (amount) => async (data, actions) => {
    try {
      if (amount <= 0) {
        alert("Amount must be greater than zero.");
        return;
      }

      const amountString = amount.toFixed(2);
      console.log("Formatted amount is ", amountString);

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amountString,
            },
          },
        ],
      });
    } catch (err) {
      setError(err.message);
      console.error("Error creating order:", err);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      console.log("Transaction completed by " + details.payer.name.given_name);
      const userId=localStorage.getItem("donId")
      console.log("userid is ",userId)
      try {
        const res=await axios.post("http://localhost:5500/campaigns/donate",{campaignId:parseInt(campaignId),amount:amount,userId:parseInt(userId)},{headers:{"Authorization":userToken}})
        if( res.status===201){
          alert("Amount donated succesfully")
        }
        setAmount(0);
      } catch (error) {
        alert("An error occured while payment try again")
      }
    
    } catch (err) {
      alert("Error capturing order:", err);
    }
  };

  return (
    <div className='w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg p-4'>
      <div className='flex justify-between gap-2 mb-4'>
        <div className='bg-orange-300 cursor-pointer border-orange-500 border-[1px] rounded-sm text-white text-center p-2 flex-1' onClick={() => handleIncrease(500)}>
          500
        </div>
        <div className='bg-orange-300 cursor-pointer border-orange-500 border-[1px] rounded-sm text-white text-center p-2 flex-1' onClick={() => handleIncrease(1000)}>
          1000
        </div>
        <div className='bg-orange-300 cursor-pointer border-orange-500 border-[1px] rounded-sm text-white text-center p-2 flex-1' onClick={() => handleIncrease(1500)}>
          1500
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      <input 
          type='text'  
          placeholder='Enter amount'
          value={amount === 0 || !amount? '' : String(amount)} 
          readOnly={true}
          className='bg-transparent border-b-[1px] border-orange-500 p-2 focus:outline-none'
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {amount > 0 && (
        <div className="relative">
         
          <div id="paypal-button-container" className="my-2">
            <PayPalButtons
              id="paypal-button"
              createOrder={createOrder(amount)}
              onApprove={onApprove}
              onError={(err) => {
                setError("Payment failed. Please try again.");
                console.error("Error with PayPal:", err);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
