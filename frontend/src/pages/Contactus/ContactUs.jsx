import React from 'react';
import { Link } from 'react-router-dom'; 
import './ContactUs.css'; 
import logo from './logo.png';

import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 27.671429,
  lng: 85.439869
};
const markerPosition = {
    lat: 27.671429, // Latitude coordinate for Khwopa College of Engineering, Bhaktapur, Nepal
    lng: 85.439869 // Longitude coordinate for Khwopa College of Engineering, Bhaktapur, Nepal
  };

const ContactUsPage = () => {
    const handleMarkerClick = () => {
        // Open Google Maps with directions to the marker location
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${markerPosition.lat},${markerPosition.lng}`, '_blank');
      };
    return (
        <div>
            <div className="company-card">
                <div className="logo-column">
                    <img src={logo} alt="Company Logo" className="company-logo" />              
                </div>
                {/* <div className="contact-info">
                    <h2>Contact Us</h2>
                    // <p>Email: example@gmail.com</p>
                    // <p>Phone: +1234567890</p>
                </div> */}
                <div className="description-column">
                    <h2>Contact Us</h2>
                    {/* <p>Email: example@gmail.com</p>
                    <p>Phone: +1234567890</p>                     */}
                    <div className='contact-info'>
                        <p>Email: <a href="mailto:autobids@gmail.com">autobids@gmail.com</a></p>
                            <p>Phone: <a href="tel:+9774567890">+9774567890</a></p>
                    </div>
                    <div className="map">
                        <LoadScript
                        googleMapsApiKey="AIzaSyCgRumUAwCHamE-TuFSYY7BSOELkR6Bk98"
                        >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            { /* Child components, such as markers, info windows, etc. */
                            <Marker position={markerPosition} />}
                            <Marker
                                position={markerPosition}
                                onClick={handleMarkerClick} // Attach click event handler
                />
                        </GoogleMap>
                        </LoadScript>
                    </div>
                    <Link to="/" className="back-button">Back to home</Link>
                </div>
            </div>
         </div>
    );
};

export default ContactUsPage;
