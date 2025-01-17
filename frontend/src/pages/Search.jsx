import React, { useState } from "react";
import "./Search.css";
import { FaTimes } from "react-icons/fa"; // Import Font Awesome icon
import Searchicon from "../assets/Home/Search Icon.png";

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value); // Call the onSearch function passed as a prop
    };

    const clearInput = () => {
        setInputValue("");
        onSearch(""); // Clear the search input
    };

    return (
        <div className="search-bar-container">
            <div className="search-icon-wrapper">
                <img className="search-icon" src={Searchicon} alt="Search" />
                <input
                    type="keyword"
                    className="search-input"
                    placeholder="Search by keyword"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
            {inputValue && (
                <button className="clear-button" onClick={clearInput}>
                    <FaTimes /> {/* Font Awesome Icon */}
                </button>
            )}
        </div>
    );
};

export default Search;