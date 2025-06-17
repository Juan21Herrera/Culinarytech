import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm w-full py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Centrado en pantallas grandes */}
        <div className="text-center w-full md:w-auto md:text-left mb-2 md:mb-0">
          © {new Date().getFullYear()} CulinaryTech. All rights reserved.
        </div>
        
        {/* Links alineados a la derecha */}
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          |
          <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
