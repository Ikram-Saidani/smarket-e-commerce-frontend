import { Button } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Payment({ cartItems, postOrder }) {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postOrder({ cartItems, paymentDetails });
    toast.success('Payment successful and order placed!');
  };

  return (
    <div className='paymentWithCard'>
      <h2>Payment</h2>
      <h3>Cart Summary</h3>
      <ul>
        {cartItems.map((item,index) => (
          <li key={item._id}>
          {index+1} : {item.title} - {item.quantity} x ${item.price.toFixed(2)} = $
            {(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <h4>Total: ${totalPrice.toFixed(2)}</h4>

      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name on Card:</label>
          <input
            type="text"
            name="nameOnCard"
            value={paymentDetails.nameOnCard}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={paymentDetails.expiry}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">Pay ${totalPrice.toFixed(2)}</Button>
      </form>
    </div>
  );
}

export default Payment;
