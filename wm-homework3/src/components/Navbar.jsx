import React from "react";
import { Link } from "react-router-dom";
import "../assets/style/components/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="options">
                <Link to="/">Home</Link>
                <Link to="/flashcard">Cards</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;
