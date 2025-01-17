import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Buttonless from '../../assets/Men/Buttonless Polo 1.jpg'; // Default color (e.g., red)
import AnotherImage from '../../assets/Men/Buttonless Polo.jpg'; // Another color (e.g., green)
import WhiteTshirt from '../../assets/Men/ButtonlessPolo White.webp';
import GreyTshirt from '../../assets/Men/ButtonlessPolo Grey.webp';
import './ProductDetaiils.css';

const ProductDetails = () => {
    const { id } = useParams();

    // State for selected size, selected color, and current image index
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Product details
    const product = {
        id: id,
        category: "Men's Clothing",
        name: "Buttonless Polo",
        price: "RM100.99",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { color: "#000000", image: Buttonless },  // Red color
            { color: "#33FF57", image: AnotherImage }, // Green color
            { color: "#FFFFFF", image: WhiteTshirt },  // Blue color
            { color: "#808080", image: GreyTshirt }, ],
        description: "A stylish polo shirt without buttons.",
        rating: 4.5,
        availableStock: 20,
    };

    const handleSizeSelection = (size) => {
        // If the selected size is already the current one, deselect it, otherwise select it
        setSelectedSize(selectedSize === size ? null : size);
    };

    const handleColorSelection = (color) => {
        // If the selected color is already the current one, deselect it, otherwise select it
        setSelectedColor(selectedColor === color ? null : color);

        // Update image index based on selected color
        const selectedColorImage = product.colors.find((colorObj) => colorObj.color === color);
        const imageIndex = product.colors.indexOf(selectedColorImage);
        setCurrentImageIndex(imageIndex); // Change the image index based on selected color
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.colors.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.colors.length) % product.colors.length);
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
                        src={product.colors[currentImageIndex]?.image}  // Dynamically set image based on color selection
                        alt={`${product.name} Image ${currentImageIndex + 1}`}
                        className="product-details-image"
                    />
                    <button className="image-nav-btn right-btn" onClick={nextImage} aria-label="Next Image">
                        &#9654;
                    </button>

                    {/* Dots Progress Bar */}
                    <div className="image-dots">
                        {product.colors.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="category">{product.category}</p>
                    <p className="price">{product.price}</p>

                    {/* Size Selection */}
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

                    {/* Color Selection */}
                    <div className="color-selection">
                        <p>Color:</p>
                        <div className="color-buttons">
                            {product.colors.map((colorObj) => (
                                <button
                                    key={colorObj.color}
                                    className={`color-btn ${selectedColor === colorObj.color ? 'selected' : ''}`}
                                    style={{ backgroundColor: colorObj.color }}
                                    onClick={() => handleColorSelection(colorObj.color)}
                                >
                                    {/* Optionally, you can add icons or other styles */}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="description">{product.description}</p>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedSize || !selectedColor} // Disable "Add to Cart" until both size and color are selected
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
