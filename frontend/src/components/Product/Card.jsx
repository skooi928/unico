import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';
import { setCartItems } from '../../pages/Cart/Cart';

const Card = ({ id, image, category, name, price, size }) => {
    const sizeText = Array.isArray(size) ? size.join(', ') : size;

    const handleAddToCart = () => {
        setCartItems({ id, image, category, name, price, size });
    };

    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className="card">
                <img src={image} alt={name} className="card-img" />
                <div className="card-content">
                    <p className="card-category">{category}</p>
                    <p className="card-title">{name}</p>
                    <p className="card-price">{price}</p>
                    {size && <p className="card-size">Size: {sizeText}</p>}
                    <button onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
};

export default Card;