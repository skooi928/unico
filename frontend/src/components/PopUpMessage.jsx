import React from "react";
import "./PopUpMessage.css";

const PopUpMessage = ({ onClose, onViewCart, onAddItems }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };

  return (
    <div id="modal" className="modal" onClick={handleBackgroundClick}>
      <div id="dialog">
        <i className="fa fa-check" style={{ fontSize: "66px", color: "lightgreen" }}></i>
        <h2 style={{ color: "rgb(88,84,84)", margin: "5px" }}>Added to cart</h2>
        <p style={{ color: "rgb(150, 150, 150)", margin: "5px" }}>
          You can view your cart by clicking the button below.
        </p>
        <button className="dialogBtn" id="viewCart" onClick={onViewCart}>
          View Cart
        </button>
        <button className="dialogBtn" id="addItems" onClick={onAddItems}>
          Add More Items
        </button>
      </div>
    </div>
  );
};

export default PopUpMessage;