import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

export const Payment = () => {
  const location = useLocation();
  const { items = [] } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const navigate = useNavigate();

  // // Add items validation
  // useEffect(() => {
  //   if (!location.state?.items) {
  //     navigate("/cart");
  //   }
  // }, []);

  // useEffect(() => {
  //   // Disable body scrolling when the component mounts
  //   document.body.classList.add("no-scroll");

  //   // Enable body scrolling when the component unmounts
  //   return () => {
  //     document.body.classList.remove("no-scroll");
  //   };
  // }, []);

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Clear cart after successful payment
      const userEmail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        ?.split("=")[1];

      if (userEmail) {
        await fetch("http://localhost:8080/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userEmail),
        });
      }

      alert("Payment Submitted Successfully!");
      navigate("/"); // Navigate to home page
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
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
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>
                    Price: <strong>RM{item.price}</strong>
                  </p>
                  <p>
                    Size:{" "}
                    <strong>
                      {Array.isArray(item.size)
                        ? item.size.join(", ")
                        : item.size || "N/A"}
                    </strong>
                  </p>
                  <p>
                    Quantity: <strong>{item.quantity}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="total-price">
          <h3>Total Amount</h3>
          <p>-- RM {totalPrice.toFixed(2)} --</p>
        </div>
      </div>
      <div className="payment-form">
        <button
          className="payment-button"
          type="submit"
          onClick={handlePayment}
        >
          Submit Payment
        </button>
        <button className="cancel-button" onClick={() => navigate("/cart")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;
