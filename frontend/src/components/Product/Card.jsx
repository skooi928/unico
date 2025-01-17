import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import './Card.css';

const Card = ({ id, image, category, name, price, size }) => {
    return (
        <Link to={`/product/${id}`} className="card-link">  {/* Link to ProductDetails page */}
            <div className="card">
                <img src={image} alt={name} className="card-img" /> {/* Image */}
                <div className="card-content">
                    <p className="card-category">{category}</p>
                    <p className="card-title">{name}</p> {/* Product Name */}
                    <p className="card-price">{price}</p> {/* Product Price */}
                    <p className="card-size">Size: {size}</p> {/* Product Size */}
                </div>
            </div>
        </Link>
    );
};

export default Card;
