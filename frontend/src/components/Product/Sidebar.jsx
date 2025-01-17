import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrows from react-icons

const Sidebar = ({ onPriceSelect }) => {
    const [expanded, setExpanded] = useState({ gender: false, price: false });

    const toggleMenu = (menu) => {
        setExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

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
                            <li className="sidebar-subitem"><a href="#">All</a></li>
                            <li className="sidebar-subitem"><a href="#Men">Men</a></li>
                            <li className="sidebar-subitem"><a href="#Women">Women</a></li>
                            <li className="sidebar-subitem"><a href="#Kids">Kids</a></li>
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
                            <li className="sidebar-subitem"><a href="#" onClick={() => onPriceSelect(0, Infinity)}>All</a></li>
                            <li className="sidebar-subitem"><a href="#40-79" onClick={() => onPriceSelect(0, 49.99)}>RM 0 - RM 49.99</a></li>
                            <li className="sidebar-subitem"><a href="#80-119" onClick={() => onPriceSelect(50, 99.99)}>RM 50 - RM 99.99</a></li>
                            <li className="sidebar-subitem"><a href="#120-159" onClick={() => onPriceSelect(100, 149.99)}>RM 120 - RM 149.99</a></li>
                            <li className="sidebar-subitem"><a href="#160-199" onClick={() => onPriceSelect(150, 9999999.99)}>RM 150 and above</a></li>
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