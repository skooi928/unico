import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import All from "../assets/Product/All.jpg";
import Men from "../assets/Product/Men.jpg";
import Women from "../assets/Product/Women.jpg";
import Kids from "../assets/Product/Kids.jpg";
import Accessories from "../assets/Product/Accessories.jpg";
import Search from "./Search";
import Sidebar from "../components/Product/Sidebar";
import Card from "../components/Product/Card";
import { useCart } from "./Cart/CartContext";
import "./Product.css";

export const Product = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [hasScrolled, setHasScrolled] = useState(false);

  const location = useLocation();
  const { addToCart } = useCart();
  const searchRef = useRef(null);

  const categoryImages = {
    all: All,
    men: Men,
    women: Women,
    kids: Kids,
    accessories: Accessories,
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY); // Update scroll position directly
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0 && window.scrollY <= 90) {
      setHasScrolled(true);
      window.scrollTo({
        top: searchRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    } else {
      setScrollPosition(window.scrollY); // Update scroll position
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll listener
    window.addEventListener("wheel", handleWheel); // Add wheel listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup scroll listener
      window.removeEventListener("wheel", handleWheel); // Cleanup wheel listener
    };
  }, [hasScrolled]);

  useEffect(() => {
    fetch("https://unico-201.onrender.com/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Add this line to check the fetched data
        setProductsData(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const currentCategory = location.hash.replace("#", "") || "All";
    setSelectedCategory(currentCategory);
  }, [location]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handlePriceSelection = (min, max) => {
    setSelectedPriceRange([min, max]);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const filteredProducts = productsData.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        product.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.type.toLowerCase().includes(searchKeyword.toLowerCase())) &&
      (selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (selectedType === "All" ||
        product.type.toLowerCase() === selectedType.toLowerCase()) &&
      product.price[0] >= selectedPriceRange[0] &&
      product.price[0] <= selectedPriceRange[1]
  );

  return (
    <div className="product-page">
      <Header onCategorySelect={handleCategorySelection} />
      <img
        className="categoryImage"
        src={categoryImages[selectedCategory.toLowerCase()]}
        alt={`${selectedCategory} Clothing`}
        style={{
          opacity: Math.max(1 - scrollPosition / 300, 0), // Fade effect
          transform: `scale(${Math.max(1 - scrollPosition / 1000, 0.8)})`, // Shrink effect
        }}
      />
      <div ref={searchRef}>
        <Search onSearch={handleSearch} />
      </div>

      <div className="product-container">
        <Sidebar
          onPriceSelect={handlePriceSelection}
          onGenderSelect={handleCategorySelection}
          onTypeSelect={handleTypeSelection}
        />
        <div className="card-container">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id} // Pass the id here
              image={product.image[0]} // Display the first image
              category={product.category}
              name={product.name}
              price={product.price} // Pass the price array
              size={product.size} // Pass the size array directly
              onAddToCart={() => addToCart(product)} // Add to cart handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
