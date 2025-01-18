import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ItemsInCart.css';

const ItemsInCart = ({ id, image, category, name, price, size, quantity }) => {
    const sizeText = Array.isArray(size) ? size.join(', ') : size;

    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className="card">
                <div className="card-content">
                    <img src={image[0]} alt={name} className="card-image" />
                    <p className="card-title">{name}</p>
                    <p className="card-price">{price}</p>
                    {size && <p className="card-size">Size: {sizeText}</p>}
                    {category && <p className="card-category">Color: {category}</p>}
                    <p className="card-quantity">Quantity: {quantity > 1 ? quantity : 1}</p>
                </div>
            </div>
        </Link>
    );
};

ItemsInCart.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    quantity: PropTypes.number.isRequired, 
};

export default ItemsInCart;
