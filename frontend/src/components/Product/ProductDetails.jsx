import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Header from '../Header';
import { useCart } from "../../pages/Cart/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart(); 

    // State for selected size and color
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleSizeSelection = (size) => {
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    const handleColorSelection = (color) => {
        const colorIndex = product.color.indexOf(color);
        setSelectedColor(prevColor => prevColor === color ? null : color);
        setCurrentImageIndex(colorIndex);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product.image?.length || 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product.image?.length || 1)) % (product.image?.length || 1));
    };

    const handleAddToCart = () => {
        if (selectedSize && selectedColor) {
          addToCart({
            id: product.id,
            name: product.name,
            image: product.image[currentImageIndex], // Use the current image
            size: selectedSize,
            color: selectedColor,
            price: product.price,
            category: product.category,
          });
          alert("Item added to cart!");
        } else {
          alert("Please select size and color!");
        }
      };

    return (
        <div className="product-details">
            <Header/>
            <div className="product-details-container">
                {/* Image Section with Navigation */}
                <div className="product-image">
                    <button className="image-nav-btn left-btn" onClick={prevImage} aria-label="Previous Image">
                        &#9664;
                    </button>
                    {product.image && (
                        <img
                            src={product.image[currentImageIndex]}
                            alt={`${product.name} Image ${currentImageIndex + 1}`}
                            className="product-details-image"
                        />
                    )}
                    <button className="image-nav-btn right-btn" onClick={nextImage} aria-label="Next Image">
                        &#9654;
                    </button>
                </div>

                {/* Dots Progress Bar */}
                <div className="image-dots">
                    {product.image?.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></div>
                    ))}
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="category">{product.category}</p>
                    <p className="price">RM{product.price}</p>

                    {/* Size Selection */}
                    <div className="size-selection">
                        <p>Size:</p>
                        <div className="size-buttons">
                            {product.size?.map((size) => (
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
                            {product.color?.map((color) => (
                                <button
                                    key={color}
                                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorSelection(color)}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="description">{product.description}</p>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedSize || !selectedColor} // Disable "Add to Cart" button until both size and color are selected
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;