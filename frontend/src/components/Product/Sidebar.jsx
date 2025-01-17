import React, { useState } from 'react';
import './Sidebar.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrows from react-icons

const Sidebar = () => {
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
                            <li className="sidebar-subitem"><a href="#men">Men</a></li>
                            <li className="sidebar-subitem"><a href="#women">Women</a></li>
                            <li className="sidebar-subitem"><a href="#kid">Kid</a></li>
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
                            <li className="sidebar-subitem"><a href="#40-79">RM 40 - RM 79.99</a></li>
                            <li className="sidebar-subitem"><a href="#80-119">RM 80 - RM 119.99</a></li>
                            <li className="sidebar-subitem"><a href="#120-159">RM 120 - RM 159.99</a></li>
                            <li className="sidebar-subitem"><a href="#160-199">RM 160 - RM 199.99</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
