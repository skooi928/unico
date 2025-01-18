import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, image, category, name, price, size }) => {
    const sizeText = Array.isArray(size) ? size.join(', ') : "";
    const displayPrice = Array.isArray(price) ? price[0].toFixed(2) : price.toFixed(2);

    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className="card">
                <img src={image} alt={name} className="card-img" />
                <div className="card-content">
                    <p className="card-category">{category}</p>
                    <p className="card-title">{name}</p>
                    <p className="card-price">RM {displayPrice}</p>
                    {size && size.length > 0 && <p className="card-size">Size: {sizeText}</p>}
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
    price: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
};

export default Card;