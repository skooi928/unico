import React, { useState, useEffect } from 'react';
import Men from "../assets/Men/Men.jpg";
import Search from "./Search";
import Sidebar from "../components/Product/Sidebar";
import Card from '../components/Product/Card';
import Buttonless from '../assets/Men/Buttonless Polo.jpg';
import './Product.css';

export const Product = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY); // Update scroll position
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); // Add scroll listener
        return () => {
            window.removeEventListener("scroll", handleScroll); // Cleanup listener
        };
    }, []);

    const products = [
        { id: 1, image: Buttonless, category:"Men", name: "Buttonless Polo", price: "RM100.99", size: "XS-XXL" },
        { id: 2, image: Buttonless, category:"Men", name: "Buttonless Polo", price: "RM100.99", size: "XS-XXL" },
        { id: 3, image: Buttonless, category:"Men", name: "Buttonless Polo", price: "RM100.99", size: "XS-XXL" },
        { id: 4, image: Buttonless, category:"Men", name: "Buttonless Polo", price: "RM100.99", size: "XS-XXL" },
        { id: 5, image: Buttonless, category:"Men", name: "Buttonless Polo", price: "RM100.99", size: "XS-XXL" }
    ];

    return (
        <div>
            <img
                className="menImage"
                src={Men}
                alt="Men's Clothing"
                style={{
                    opacity: Math.max(1 - scrollPosition / 300, 0), // Fade effect
                    transform: `scale(${Math.max(1 - scrollPosition / 1000, 0.8)})` // Shrink effect
                }}
            />
            <Search />

            <div className="product-container">
                <Sidebar />
                <div className="card-container">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            id={product.id}  // Pass the id here
                            image={product.image}
                            category={product.category}
                            name={product.name}
                            price={product.price}
                            size={product.size}
                            addToCart={() => addToCart(product)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
