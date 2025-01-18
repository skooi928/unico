import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrows from react-icons

const Sidebar = ({ onPriceSelect }) => {
    const [expanded, setExpanded] = useState({ gender: false, price: false });
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
    const location = useLocation();

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
                                    to="/product#All"
                                    className={isActive('#All') ? 'active-link' : ''}
                                >
                                    All
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Men"
                                    className={isActive('#Men') ? 'active-link' : ''}
                                >
                                    Men
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Women"
                                    className={isActive('#Women') ? 'active-link' : ''}
                                >
                                    Women
                                </NavLink>
                            </li>
                            <li className="sidebar-subitem">
                                <NavLink
                                    to="/product#Kids"
                                    className={isActive('#Kids') ? 'active-link' : ''}
                                >
                                    Kids
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
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    onPriceSelect: PropTypes.func.isRequired,
};

export default Sidebar;