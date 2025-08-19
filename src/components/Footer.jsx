import React from "react";
import "./styles/lastpage.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* It's better to add this link in your public/index.html file */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        crossOrigin="anonymous"
      />
      
      <footer className="last-page">
        <div className="footer-columns">
          <div>
            <h4>ABOUT</h4>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Flipkart Stories</p>
            <p>Press</p>
            <p>Corporate Information</p>
          </div>

          <div>
            <h4>GROUP COMPANIES</h4>
            <p>Myntra</p>
            <p>Cleartrip</p>
            <p>Shopsy</p>
          </div>

          <div>
            <h4>HELP</h4>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>FAQ</p>
          </div>

          <div>
            <h4>CONSUMER POLICY</h4>
            <p>Cancellation & Returns</p>
            <p>Terms Of Use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
            <p>Grievance Redressal</p>
            <p>EPR Compliance</p>
          </div>

          <div>
            <h4>Mail Us:</h4>
            <p>Shopy Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Outer Ring Road, Devarabeesanahalli Village,</p>
            <p>Hyderabad, 560103,</p>
            <p>Telangana, India</p>
            
            <h4>Registered Office Address:</h4>
            <p>Shopy Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Outer Ring Road, Devarabeesanahalli Village,</p>
            <p>Hyderabad, 560103,</p>
            <p>Telangana, India</p>
            <p>CIN : U51109KA2012PTC066107</p>
            <p>Telephone: 6281215778</p>
            
            <h4>Social:</h4>
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Become a Seller | Advertise | Gift Cards | Help Center</p>
          <p>© 2005-2025 shopy.com</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;