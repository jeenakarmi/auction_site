import React from 'react';
import { Link } from 'react-router-dom'; 
import './AboutUs.css'; 
import logo from './logo.png';

const AboutUsPage = () => {
    return (
        <div>
            <div className="company-card">
                <div className="logo-column">
                    <img src={logo} alt="Company Logo" className="company-logo" />              
                </div>
                <div className="description-column">
                    <h2>About Us</h2>
                    <p>
                    Welcome to AUTOBIDs, where the thrill of the auction meets the ease of online trading.
                    </p>
                    <p>
                    Our platform offers a dynamic auction system for vehicles, designed to make buying and selling an exhilarating and efficient experience.
                    Whether you're a buyer seeking the perfect ride or a seller looking to get the best value for your vehicle, AUTOBIDs provides a seamless platform where transactions unfold in real-time. 
                    </p>
                    <p>
                    With our intuitive interface and expert support, you can bid with confidence or list your vehicle with ease, knowing that you're part of a community committed to transparency and fairness. 
                    Join us at AUTOBIDs and discover a new way to navigate the automotive marketplace.
                    </p>
                    <p>
                    <Link to="/contact" className="contact-link">Contact us </Link>  today to learn more about how we can help you achieve your goals!
                    </p>
                    
                    <Link to="/" className="back-button">Back to home</Link>
                </div>
            </div>
         </div>
    );
};

export default AboutUsPage;
