import React, { useState } from "react";
import "./Search.css";
import { FaTimes } from "react-icons/fa"; // Import Font Awesome icon
import Searchicon from "../assets/Home/Search Icon.png";

const Search = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const clearInput = () => {
        setInputValue("");
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
