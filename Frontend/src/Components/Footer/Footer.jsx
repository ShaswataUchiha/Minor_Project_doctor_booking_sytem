import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-500 to-indigo-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-50 animate-gradient"></div>

      <div className="relative z-10 container mx-auto px-4 py-10 lg:py-16 text-white">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              We are committed to providing the best services and creating value for our customers. Your satisfaction is our priority.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm border-t border-white/10 pt-5">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
