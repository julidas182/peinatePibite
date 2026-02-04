import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <FaInstagram size={30} className="icon" />
        <FaWhatsapp size={30} className="icon" />
        <FaFacebook size={30} className="icon" />
        <MdEmail size={30} className="icon" />
      </div>
      <p className="copyright">© 2026 Web-cut. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;