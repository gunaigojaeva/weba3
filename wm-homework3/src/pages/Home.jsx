import React from "react";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
import Navbar from '../components/Navbar.jsx';
import "../assets/style/pages/home.css";

const HomePage = () => {
    return (
        <div className="home-page-container">
            <Navbar />
            <h1 className="home-page-title">Welcome to the Home Page</h1>
        </div>
    );
};

export default HomePage;
