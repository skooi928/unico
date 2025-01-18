import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import Header from "../Header";
import { useCart } from "../../pages/Cart/CartContext";
import PopUpMessage from "../PopUpMessage";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // State for selected size and color
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setDisplayPrice(
          Array.isArray(data.price)
            ? data.price[0].toFixed(2)
            : data.price.toFixed(2)
        ); // Set default price
        if (data.color && data.color.length > 0) {
          setSelectedColor(data.color[0]); // Set default color
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSizeSelection = (size, index) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
    setSelectedSizeIndex((prevIndex) => (prevIndex === index ? null : index));
    setDisplayPrice(
      Array.isArray(product.price)
        ? product.price[index].toFixed(2)
        : product.price.toFixed(2)
    ); // Update price based on selected size
  };

  const handleColorSelection = (color) => {
    const colorIndex = product.color.indexOf(color);
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
    setCurrentImageIndex(colorIndex);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % (product.image?.length || 1);
    setCurrentImageIndex(newIndex);
    setSelectedColor(product.color[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + (product.image?.length || 1)) %
      (product.image?.length || 1);
    setCurrentImageIndex(newIndex);
    setSelectedColor(product.color[newIndex]);
  };

  const isAddToCartDisabled = () => {
    if (product.size && product.size.length > 0) {
      return !selectedSize || !selectedColor;
    }
    return !selectedColor;
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
      setShowPopup(true); // Show the popup message
    } else if (product.category.toLowerCase() === "accessories") {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image[currentImageIndex], // Use the current image
        color: selectedColor,
        price: product.price,
        category: product.category,
      });
      setShowPopup(true); // Show the popup message
    } else {
      alert("Please select size and color!");
    }
  };

  const handleViewCart = () => {
    setShowPopup(false);
    navigate("/cart");
  };

  const handleAddItems = () => {
    setShowPopup(false);
  };

  return (
    <div className="product-details">
      <Header />
      <div className="product-details-container">
        {/* Image Section with Navigation */}
        <div className="product-image">
          <button
            className="image-nav-btn left-btn"
            onClick={prevImage}
            aria-label="Previous Image"
          >
            &#9664;
          </button>
          {product.image && (
            <img
              src={product.image[currentImageIndex]}
              alt={`${product.name} Image ${currentImageIndex + 1}`}
              className="product-details-image"
            />
          )}
          <button
            className="image-nav-btn right-btn"
            onClick={nextImage}
            aria-label="Next Image"
          >
            &#9654;
          </button>
        </div>

        {/* Dots Progress Bar */}
        <div className="image-dots">
          {product.image?.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="category">{product.category}</p>
          <p className="price">RM{displayPrice}</p>

          {/* Size Selection */}
          {product.size && product.size.length > 0 && (
            <div className="size-selection">
              <p>Size:</p>
              <div className="size-buttons">
                {product.size.map((size, index) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeSelection(size, index)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div className="color-selection">
            <p>Color:</p>
            <div className="color-buttons">
              {product.color?.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelection(color)}
                />
              ))}
            </div>
          </div>

          <p className="description">{product.description}</p>
          <button
            className="add-to-cart-btn"
            disabled={isAddToCartDisabled()} // Disable "Add to Cart" button based on size and color selection
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      {showPopup && (
        <PopUpMessage
          onClose={() => setShowPopup(false)}
          onViewCart={handleViewCart}
          onAddItems={handleAddItems}
        />
      )}
    </div>
  );
};

export default ProductDetails;
