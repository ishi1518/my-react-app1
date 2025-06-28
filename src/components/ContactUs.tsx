import React from 'react';
import './ContactUs.css'; // We will create this file later
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-form-section">
        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="form-group textarea-group">
            <textarea placeholder="Share your thoughts"></textarea>
          </div>
          <button type="submit" className="submit-button">SHARE YOUR FEEDBACK</button>
        </form>
      </div>
      <div className="contact-info-section">
        <h1 className="contact-title">Contact <span className="us-text">Us</span></h1>
        <div className="underline"></div>
        <p className="contact-description">
          It is very important for us to keep in touch with you, so we are always ready to answer any
          question that interests you. Shoot!
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
            <p>Navsari, Gujarat</p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <p><a href="mailto:21bmiit093@gmail.com">21bmiit093@gmail.com</a></p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <p><a href="tel:+916356962811">+91 6356962811</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 