import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Men from "../assets/Product/Men.jpg";
import Search from "./Search";
import Sidebar from "../components/Product/Sidebar";
import Card from '../components/Product/Card';
import './Product.css';

export const Product = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [productsData, setProductsData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);

    const location = useLocation();
    const selectedCategory = location.hash.replace('#', '') || "";

    const handleScroll = () => {
        setScrollPosition(window.scrollY); // Update scroll position
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); // Add scroll listener
        return () => {
            window.removeEventListener("scroll", handleScroll); // Cleanup listener
        };
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/products') // Update the port here
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Add this line to check the fetched data
                setProductsData(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handlePriceSelection = (min, max) => {
        setSelectedPriceRange([min, max]);
    };

    const filteredProducts = productsData.filter(product =>
        (product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.type.toLowerCase().includes(searchKeyword.toLowerCase())) &&
        (selectedCategory === "" || product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1])
    );

    return (
        <div className="product-page">
            <Header/>
            <img
                className="menImage"
                src={Men}
                alt="Men's Clothing"
                style={{
                    opacity: Math.max(1 - scrollPosition / 300, 0), // Fade effect
                    transform: `scale(${Math.max(1 - scrollPosition / 1000, 0.8)})`, // Shrink effect
                }}
            />
            <Search onSearch={handleSearch} />

            <div className="product-container">
                <Sidebar onPriceSelect={handlePriceSelection} />
                <div className="card-container">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            id={product.id} // Pass the id here
                            image={product.image[0]} // Display the first image
                            category={product.category}
                            name={product.name}
                            price={`RM${product.price}`}
                            size={product.size ? product.size.join(", ") : "N/A"} // Add null check here
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;