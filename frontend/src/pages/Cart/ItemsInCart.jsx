import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ItemsInCart.css';

const ItemsInCart = ({ id, image, color, name, price, size, quantity, onRemove }) => {
    const sizeText = Array.isArray(size) ? size.join(', ') : size;

    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Stop event propagation
        e.preventDefault(); // Prevent default link behavior
        onRemove(id, size, color);
    };

    return (
        <div className="card-wrapper">
            <Link to={`/product/${id}`} className="card-link">
                <div className="card">
                    <div className="card-content">
                        <img src={image} alt={name} className="card-image" />
                        <p className="card-title">{name}</p>
                        <p className="card-price">{price}</p>
                        {size && <p className="card-size">Size: {sizeText}</p>}
                        {color && (
                            <div className="card-color">
                                <span>Color: </span>
                                <div className="color-circle" style={{ backgroundColor: color }}></div>
                            </div>
                        )}
                        <p className="card-quantity">Quantity: {quantity > 1 ? quantity : 1}</p>
                    </div>
                    <div className="card-overlay">
                        <button className="remove-button" onClick={handleRemoveClick}>Remove from Cart</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

ItemsInCart.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default ItemsInCart;