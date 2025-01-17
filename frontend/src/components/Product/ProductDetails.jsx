import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Buttonless from '../../assets/Men/Buttonless Polo 1.jpg';
import AnotherImage from '../../assets/Men/Buttonless Polo.jpg'
import './ProductDetaiils.css';

const ProductDetails = () => {
    const { id } = useParams();

    // State for selected size
    const [selectedSize, setSelectedSize] = useState(null);

    // State for current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const product = {
        id: id,
        images: [Buttonless, AnotherImage], // Array of product images
        category: "Men's Clothing",
        name: "Buttonless Polo",
        price: "RM100.99",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"], // Use an array for available sizes
        description: "A stylish polo shirt without buttons.",
        rating: 4.5,
        availableStock: 20,
    };

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="product-details">
            <div className="product-details-container">
                {/* Image Section with Navigation */}
                <div className="product-image">
                    <button className="image-nav-btn left-btn" onClick={prevImage} aria-label="Previous Image">
                        &#9664;
                    </button>
                    <img
                        src={product.images[currentImageIndex]}
                        alt={`${product.name} Image ${currentImageIndex + 1}`}
                        className="product-details-image"
                    />
                    <button className="image-nav-btn right-btn" onClick={nextImage} aria-label="Next Image">
                        &#9654;
                    </button>
                </div>

                {/* Dots Progress Bar */}
                <div className="image-dots">
                    {product.images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                        ></div>
                    ))}
                </div>

                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="category">{product.category}</p>
                    <p className="price">{product.price}</p>
                    <div className="size-selection">
                        <p>Size:</p>
                        <div className="size-buttons">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => handleSizeSelection(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="description">{product.description}</p>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedSize} // Disable "Add to Cart" button until a size is selected
                    >
                        {selectedSize ? `ADD TO CART (${selectedSize})` : "SELECT SIZE FIRST"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
