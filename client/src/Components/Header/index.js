

import React, { useState } from 'react';
import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Link } from 'react-router-dom';
import { LuUser2 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import "../../Pages/Home/Home.css";


const smoothScrollTo = (element) => {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // Adjust this for smoother scrolling
    let start = null;

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const timeFraction = Math.min(progress / duration, 1);
        const ease = easeInOutQuad(timeFraction);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < duration) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};


const Header = () => {

    const context = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [activePage, setActivePage] = useState("Home");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleNavigation = (page) => {
        setActivePage(page);

        if (page === "Products") {
            const section = document.getElementById("products");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else if (page === "Home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!query.trim()) {
            setResults([]); // Clear results if query is empty
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                console.log("Search API Response:", data);
                setResults(data); // Store search results
            } catch (error) {
                console.error("Search API Error:", error);
            }
        };

        const debounce = setTimeout(fetchSearchResults, 300); // Debounce API calls

        return () => clearTimeout(debounce); // Cleanup on unmount or query change
    }, [query]);

    // Function to handle clicking on a search result
    const handleSelectProduct = () => {
        setQuery("");      // Clear input field
        setResults([]);    // Hide search results
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        localStorage.clear();
        context.setisLogin(false);
    }

    return (
        <>
            <header className="overlay-header">
                <div className="logo">EScanGrocery</div>

                <ul className="menu">
                    {["Home", "Products", "Info"].map((page) => (
                        <li
                            key={page}
                            className={activePage === page ? "active" : ""}
                            onClick={() => {
                                setActivePage(page);
                                setTimeout(() => {
                                    if (page === "Products") {
                                        const section = document.querySelector(".homeProducts"); // Select Featured Products
                                        if (section) {
                                            smoothScrollTo(section);
                                        }
                                    } else if (page === "Home") {
                                        // smoothScrollTo(document.body);
                                        window.location.href = "/";
                                    }
                                }, 100);
                            }}
                        >
                            <span style={{ cursor: "pointer" }}>{page}</span>
                        </li>
                    ))}
                </ul>




                <div className="header-actions">
                    <div className="headerSearch mr-3">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button><CiSearch /></button>

                        {results.length > 0 && (
                            <div className="search-results">
                                {results.map((product) => (
                                    <Link
                                        to={`/product/${product._id}`}
                                        key={product._id}
                                        className="search-item"
                                        onClick={handleSelectProduct} // Hide results on click
                                    >
                                        {product.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <Link to="/my-list">
                        <button className='wishlist-btn'>Wishlist &nbsp;<FaRegHeart /></button>
                    </Link>

                    {/* Payment History Button */}
                    <Link to="/payment-history">
                        <button className='payment-history-btn'>Payment History &nbsp;<MdShoppingCart /></button>
                    </Link>

                    {/* Sign In Button - Changes Based on Login State */}
                    {
                        context.isLogin !== true ? (
                            <Link to="/signIn">
                                <button className='sign-in-btn'>Signin</button>
                            </Link>
                        ) : (
                            <>
                                <button className='sign-in-btn' onClick={handleClick}><LuUser2 /></button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )
                    }
                </div>

            </header>
        </>
    )
}

export default Header;

