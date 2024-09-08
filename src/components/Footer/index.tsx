import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-3">
      <div className="max-w-auto mx-auto px-4">
        <div className="flex flex-col md:justify-between">
          {/* Left section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Contact Us</h2>
            <div className="flex items-center mb-2">
              <Mail size={20} className="mr-2" />
              <span>info@chikiimass.com</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={20} className="mr-2" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin size={20} className="mr-2" />
              <span>123 Chikiimass Street, City, Country</span>
            </div>
          </div>

          {/* Right section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Quick Links</h2>
            <ul className="flex flex-col space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;