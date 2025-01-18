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
  const [currentStock, setCurrentStock] = useState(null);
  const [stockIndex, setStockIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // State for selected size and color
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [isStockUpdating, setIsStockUpdating] = useState(false);

  // Add getStockForSizeAndColor function
  const getStockForSizeAndColor = (sizeIndex, colorIndex) => {
    if (!product.stock || !product.size || !product.color) return null;
    const newStockIndex = colorIndex + sizeIndex * product.color.length;
    setStockIndex(newStockIndex);
    return product.stock[newStockIndex];
  };

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
    setSelectedSizeIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;
      if (newIndex !== null && selectedColor) {
        const colorIndex = product.color.indexOf(selectedColor);
        const newStockIndex = colorIndex + newIndex * product.color.length;
        setStockIndex(newStockIndex);
        setCurrentStock(product.stock[newStockIndex]);
        setQuantity(1);
      }
      return newIndex;
    });
    setDisplayPrice(
      Array.isArray(product.price)
        ? product.price[index].toFixed(2)
        : product.price.toFixed(2)
    );
  };

  const handleColorSelection = (color) => {
    const colorIndex = product.color.indexOf(color);
    setSelectedColor((prevColor) => {
      const newColor = prevColor === color ? null : color;
      if (newColor && selectedSizeIndex !== null) {
        const newStockIndex =
          colorIndex + selectedSizeIndex * product.color.length;
        setStockIndex(newStockIndex);
        setCurrentStock(product.stock[newStockIndex]);
        setQuantity(1);
      }
      return newColor;
    });
    setCurrentImageIndex(colorIndex);
  };

  const handleQuantityChange = (change) => {
    if (!currentStock || stockIndex === null) return;
    setQuantity((prev) => Math.max(1, Math.min(prev + change, currentStock)));
  };

  const handleAddToCart = async () => {
    if (
      selectedSize &&
      selectedColor &&
      currentStock > 0 &&
      quantity <= currentStock
    ) {
      setIsStockUpdating(true);
      try {
        // Wait for cart update to complete
        await addToCart({
          id: product.id,
          name: product.name,
          image: product.image[currentImageIndex],
          size: selectedSize,
          color: selectedColor,
          price: product.price,
          category: product.category,
          quantity: quantity,
        });

        // Then fetch updated product data
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        const updatedData = await response.json();

        setProduct(updatedData);
        setDisplayPrice(
          Array.isArray(updatedData.price)
            ? updatedData.price[0].toFixed(2)
            : updatedData.price.toFixed(2)
        );
        if (stockIndex !== null) {
          setCurrentStock(updatedData.stock[stockIndex]);
        }

        setShowPopup(true);
        setQuantity(1);
      } catch (error) {
        console.error("Error updating cart and fetching stock:", error);
      } finally {
        setIsStockUpdating(false);
      }
    } else {
      alert("Please select size and color!");
    }
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
    if (currentStock === 0) return true;
    if (product.size && product.size.length > 0) {
      return !selectedSize || !selectedColor;
    }
    return !selectedColor;
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

          {currentStock !== null && (
            <div className="stock-quantity-container">
              <p className="stock-info">
                Available Stock:{" "}
                {isStockUpdating ? "Updating..." : currentStock}
              </p>
              <div className="stock-controls">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || isStockUpdating}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= currentStock || isStockUpdating}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            className="add-to-cart-btn"
            disabled={isAddToCartDisabled()} // Disable "Add to Cart" button based on size and color selection
            onClick={handleAddToCart}
          >
            {currentStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
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
