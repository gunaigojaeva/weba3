import React from "react";
import Navbar from "../components/Navbar.jsx";
import ContactForm from "../components/ContactForm.jsx";
import "../assets/style/pages/contact.css";

const ContactPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <section className="contact-section">
                    <ContactForm />
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
