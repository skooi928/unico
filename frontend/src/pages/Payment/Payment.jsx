import React, { useState } from 'react';
import './Payment.css';

export const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you can add payment API integration
    alert('Payment Submitted Successfully!');
    console.log({
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
    });
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Name on Card:
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="John Doe"
              required
            />
          </label>
        </div>
        <div className="form-group-flex">
          <label>
            Expiration Date:
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength="3"
              required
            />
          </label>
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;