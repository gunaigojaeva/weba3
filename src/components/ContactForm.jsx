import React, { useState } from "react";
import axios from "axios";
import "../assets/style/components/contactform.css";

const ContactForm = () => {
    const [formData, configureContactForm] = useState({
        subject: "",
        email: "",
        message: "",
    });

    const [submitStatus, setSubmitStatus] = useState(null);

    const changeFunction = (e) => {
        const { name, value } = e.target;
        configureContactForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const submitMessage = async (e) => {
        e.preventDefault();
        try {
            const currentDateTime = new Date().toLocaleString();

            await axios.post("http://localhost:3001/messages", {
                ...formData,
                createdDate: currentDateTime,
            });

            configureContactForm({
                subject: "",
                email: "",
                message: "",
            });

            setSubmitStatus("success");

            setTimeout(() => {
                setSubmitStatus(null);
            }, 1000);
        } catch (error) {
            console.error("Error happened while submitting form:", error);
        }
    };

    return (
        <form className="contact-form" onSubmit={submitMessage}>
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={changeFunction}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeFunction}
            />

            <label htmlFor="message">Message:</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={changeFunction}
            />

            <div className="last">
                <button type="submit">Send</button>
                <div className="submit-message">
                    {submitStatus === "success" && (
                        <div className="success-message">Message sent successfully!</div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ContactForm;