import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

export const Payment = () => {
  const location = useLocation();
  const { items } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const navigate = useNavigate();

  // Add items validation
  useEffect(() => {
    if (!location.state?.items) {
      navigate("/cart");
    }
  }, []);

  useEffect(() => {
    // Disable body scrolling when the component mounts
    document.body.classList.add("no-scroll");

    // Enable body scrolling when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you can add payment API integration
    alert("Payment Submitted Successfully!");
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
      <div className="order-summary">
        <h3>Order Summary</h3>
        {!items || items.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <p>{item.name}</p>
                  <p>Price: RM{item.price}</p>
                  <p>
                    Size:{" "}
                    {Array.isArray(item.size)
                      ? item.size.join(", ")
                      : item.size || "N/A"}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="payment-button" type="submit">
        Submit Payment
      </button>
    </div>
  );
};

export default Payment;
