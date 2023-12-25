import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar.jsx';
import Projects from '../components/Project.jsx';
import "../assets/style/pages/home.css";

const HomePage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3001/myProjects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="home-page-container">
            <Navbar />
            <div className="infos">
                <h1 className="home-page-title">About Me</h1>
                <div className="about-part">
                    <span className="about">I'm Gunay Gojayeva, born on March 25, 2003. Currently pursuing my passion for Information Technology at Ada University, I find myself in my final year as a 4th-year student. Throughout my academic journey, I've completed a foundational year followed by three years of enriching General Education. Beyond my academic pursuits, I indulge in various hobbies that keep me balanced and engaged. I'm an avid cherish moments spent with my friends and family, enjoy leisurely walks, and find solace in the world of books. These interests fuel my curiosity and complement my studies, allowing me to explore diverse facets of life</span>
                </div>
            </div>
            <Projects projects={projects} />
        </div>
    );
};

export default HomePage;
