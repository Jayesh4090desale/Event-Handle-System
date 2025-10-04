import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4 text-primary-400">
              Manomangal Lawns
            </h3>
            <p className="text-gray-400 mb-4">
              Creating unforgettable memories for your special occasions
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Wedding Ceremonies</li>
              <li>Reception Parties</li>
              <li>Corporate Events</li>
              <li>Birthday Celebrations</li>
              <li>Catering Services</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>Manomangal Lawns, Shingave Shivar, Shirpur, Maharashtra 425405</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="flex-shrink-0" />
                <span>+91 9359525834</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="flex-shrink-0" />
                <span>jayeshrcpit2003@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Manomangal Lawns. All rights reserved. Managed by Jayesh Patil</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
