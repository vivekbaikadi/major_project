import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaHistory, FaHeart, FaBarcode } from "react-icons/fa";
import "../../Pages/Home/Home.css";

const MobileNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showBottomNav, setShowBottomNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowBottomNav(true);
            } else {
                setShowBottomNav(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Transparent Header */}
            <header className="mobile-header">
                <div className="logo">MyWebsite</div>
                <div className="mobile-menu">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <FaSearch />
                    <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                </div>
                {menuOpen && (
                    <div className="dropdown-menu show">
                        <Link to="/user">User</Link>
                        <Link to="/payment-history">Payment History</Link>
                    </div>
                )}
            </header>

            {/* Sticky Bottom Navigation */}
            <nav className={`bottom-nav ${showBottomNav ? "visible" : "hidden"}`}>
                <Link to="/"><FaHome /></Link>
                <Link to="/scanner" className="scanner"><FaBarcode /></Link>
                <Link to="/wishlist"><FaHeart /></Link>
            </nav>
        </>
    );
};

export default MobileNavbar;
