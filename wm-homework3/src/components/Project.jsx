import React from "react";
import "../assets/style/components/project.css";

const EachProject = ({ projects }) => {
    return (
        <section className="projects-section">
            <h2>Projects</h2>
            <div className="allprojects">
                {projects.map((project, index) => (
                    <div className="project" key={index}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EachProject;
