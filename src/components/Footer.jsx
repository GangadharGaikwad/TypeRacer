import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="game-footer">
      <div className="footer-content">
        <div>
          <div className="footer-logo">TYPE RACER</div>
          <div className="footer-info">
            <p className="copyright">© {currentYear} Gangadhar Gaikwad</p>
            <p className="version">v1.0</p>
          </div>
        </div>
        
        <div className="footer-links">
          <a 
            href="mailto:gangadhargaikwad186@gmail.com" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className="link-text">Email</span>
          </a>
          <a 
            href="https://github.com/GangadharGaikwad" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className="link-text">GitHub</span>
          </a>
          <a 
            href="https://www.instagram.com/animenature_ig/" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className="link-text">Instagram</span>
          </a>
        </div>
        
        <div className="footer-tagline">
          Made with <span className="heart">♥</span> and a mechanical keyboard
        </div>
      </div>
    </footer>
  );
};

export default Footer; 