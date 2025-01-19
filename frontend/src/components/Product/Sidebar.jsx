import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrows from react-icons

const Sidebar = ({ onPriceSelect, onGenderSelect, onTypeSelect }) => {
    const [expanded, setExpanded] = useState({ gender: false, price: false, type: false });
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = (menu) => {
        setExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const isActive = (hash) => location.hash === hash;

    const handlePriceSelect = (min, max) => {
        if (selectedPriceRange[0] === min && selectedPriceRange[1] === max) {
            // Deselect if the same range is clicked again
            setSelectedPriceRange([0, Infinity]);
            onPriceSelect(0, Infinity);
        } else {
            setSelectedPriceRange([min, max]);
            onPriceSelect(min, max);
        }
    };

    const handleGenderSelect = (gender) => {
        if (selectedGender === gender) {
            // Deselect if the same gender is clicked again
            setSelectedGender('All');
            onGenderSelect('All');
            navigate('/product#All'); // Change URL to /product#All
        } else {
            setSelectedGender(gender);
            onGenderSelect(gender);
            navigate(`/product#${gender}`); // Change URL to the selected gender
        }
    };

    const handleTypeSelect = (type) => {
        if (selectedType === type) {
            // Deselect if the same type is clicked again
            setSelectedType('All');
            onTypeSelect('All');
        } else {
            setSelectedType(type);
            onTypeSelect(type);
        }
    };

    const handleCustomPriceSelect = () => {
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        if (min > max) {
            setErrorMessage('Error: Minimum price cannot be greater than maximum price.');
            return;
        }
        setErrorMessage('');
        setSelectedPriceRange([min, max]);
        onPriceSelect(min, max);
    };

    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        if (value.match(/^\d*\.?\d{0,2}$/)) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        if (value.match(/^\d*\.?\d{0,2}$/)) {
            setMaxPrice(value);
        }
    };

    const isPriceActive = (min, max) => selectedPriceRange[0] === min && selectedPriceRange[1] === max;

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {/* Gender Menu */}
                <li className="sidebar-item">
                    <div
                        onClick={() => toggleMenu('gender')}
                        className="sidebar-expandable"
                        tabIndex="0"
                        aria-expanded={expanded.gender}
                    >
                        Gender
                        {/* Show FaChevronUp if expanded, FaChevronDown if collapsed */}
                        {expanded.gender ? (
                            <FaChevronUp className="arrow1" />
                        ) : (
                            <FaChevronDown className="arrow1" />
                        )}
                    </div>
                    {expanded.gender && (
                        <ul className="sidebar-submenu">
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Men"
                                    className={selectedGender === 'Men' ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleGenderSelect('Men');
                                    }}
                                >
                                    Men
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Women"
                                    className={selectedGender === 'Women' ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleGenderSelect('Women');
                                    }}
                                >
                                    Women
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Kids"
                                    className={selectedGender === 'Kids' ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleGenderSelect('Kids');
                                    }}
                                >
                                    Kids
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Type Menu */}
                <li className="sidebar-item">
                    <div
                        onClick={() => toggleMenu('type')}
                        className="sidebar-expandable"
                        tabIndex="0"
                        aria-expanded={expanded.type}
                    >
                        Type
                        {/* Show FaChevronUp if expanded, FaChevronDown if collapsed */}
                        {expanded.type ? (
                            <FaChevronUp className="arrow1" />
                        ) : (
                            <FaChevronDown className="arrow1" />
                        )}
                    </div>
                    {expanded.type && (
                        <ul className="sidebar-submenu">
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#type-top"
                                    className={selectedType === 'Top' ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTypeSelect('Top');
                                    }}
                                >
                                    Top
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#type-bottom"
                                    className={selectedType === 'Bottom' ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTypeSelect('Bottom');
                                    }}
                                >
                                    Bottom
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Price Menu */}
                <li className="sidebar-item">
                    <div
                        onClick={() => toggleMenu('price')}
                        className="sidebar-expandable"
                        tabIndex="0"
                        aria-expanded={expanded.price}
                    >
                        Price
                        {/* Show FaChevronUp if expanded, FaChevronDown if collapsed */}
                        {expanded.price ? (
                            <FaChevronUp className="arrow1" />
                        ) : (
                            <FaChevronDown className="arrow1" />
                        )}
                    </div>
                    {expanded.price && (
                        <ul className="sidebar-submenu">
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#price-0-49"
                                    className={isPriceActive(0, 49.99) ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePriceSelect(0, 49.99);
                                    }}
                                >
                                    RM 0 - RM 49.99
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#price-50-99"
                                    className={isPriceActive(50, 99.99) ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePriceSelect(50, 99.99);
                                    }}
                                >
                                    RM 50 - RM 99.99
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#price-100-149"
                                    className={isPriceActive(100, 149.99) ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePriceSelect(100, 149.99);
                                    }}
                                >
                                    RM 100 - RM 149.99
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="#price-150"
                                    className={isPriceActive(150, Infinity) ? 'active-link' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePriceSelect(150, Infinity);
                                    }}
                                >
                                    RM 150 and above
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <div className="custom-price-filter">
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                    />
                                    <button onClick={handleCustomPriceSelect}>Apply</button>
                                </div>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    onPriceSelect: PropTypes.func.isRequired,
    onGenderSelect: PropTypes.func.isRequired,
    onTypeSelect: PropTypes.func.isRequired,
};

export default Sidebar;