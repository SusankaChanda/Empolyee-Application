import React from 'react';
import '../styling/footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
       <div className='patents'>
        <div>© {year} Your Company. All rights reserved.</div>
       </div>
        <div className="links">
          <a href="/privacy-policy" className="link">Privacy Policy</a>
          <a href="/terms-of-service" className="link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
