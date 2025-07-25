
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBook,
  FaHeart,
  FaCreditCard,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="mt-16 border-t"
      style={{ 
        backgroundColor: 'var(--color-bg-dark)',
        borderColor: 'var(--color-border)'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <FaBook 
                className="text-2xl"
                style={{ color: 'var(--color-secondary)' }}
              />
              <h3 
                className="text-xl font-bold font-primary"
                style={{ color: 'var(--color-secondary)' }}
              >
                BookStore
              </h3>
            </div>
            <p 
              className="text-sm leading-relaxed font-secondary"
              style={{ color: 'var(--color-text-light)' }}
            >
              Your premier destination for discovering extraordinary books. From timeless classics to contemporary bestsellers, we curate the finest literary experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              {[
                { icon: FaFacebookF, href: '#', label: 'Facebook' },
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                { icon: FaYoutube, href: '#', label: 'YouTube' }
              ].map((social) => (
                <Link
                  key={social.label}
                  to={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-light)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-secondary)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-bg-light)';
                    e.target.style.color = 'var(--color-text-light)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-semibold mb-6 font-primary"
              style={{ color: 'var(--color-secondary)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'New Releases', href: '/new-releases' },
                { name: 'Best Sellers', href: '/bestsellers' },
                { name: 'Categories', href: '/categories' },
                { name: 'Authors', href: '/authors' },
                { name: 'Reviews', href: '/reviews' },
                { name: 'Blog', href: '/blog' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-secondary hover:opacity-70 transition-opacity duration-200"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 
              className="text-lg font-semibold mb-6 font-primary"
              style={{ color: 'var(--color-secondary)' }}
            >
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', href: '/contact' },
                { name: 'Help Center', href: '/help' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns', href: '/returns' },
                { name: 'Track Order', href: '/track' },
                { name: 'Gift Cards', href: '/gift-cards' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-secondary hover:opacity-70 transition-opacity duration-200"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-lg font-semibold mb-6 font-primary"
              style={{ color: 'var(--color-secondary)' }}
            >
              Get in Touch
            </h4>
            <div className="space-y-4">
              {[
                { icon: FaMapMarkerAlt, text: '123 Literary Lane, Book City, BC 12345' },
                { icon: FaPhone, text: '+1 (555) 123-4567' },
                { icon: FaEnvelope, text: 'hello@bookstore.com' }
              ].map((contact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <contact.icon 
                    className="text-sm mt-1 flex-shrink-0"
                    style={{ color: 'var(--color-secondary)' }}
                  />
                  <span 
                    className="text-sm font-secondary"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 
                className="text-sm font-semibold mb-3 font-primary"
                style={{ color: 'var(--color-secondary)' }}
              >
                Newsletter
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-1"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-secondary)'
                  }}
                />
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-r-lg hover:opacity-90 transition-opacity duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div 
        className="border-t py-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaShippingFast, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% protected' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated help' },
              { icon: FaHeart, title: 'Easy Returns', desc: '30-day policy' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon 
                  className="text-xl flex-shrink-0"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <div>
                  <h6 
                    className="text-sm font-semibold font-primary"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {feature.title}
                  </h6>
                  <p 
                    className="text-xs font-secondary"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="border-t py-4"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-bg-light)'
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p 
              className="text-sm font-secondary"
              style={{ color: 'var(--color-text-light)' }}
            >
              © 2024 BookStore. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span 
                className="text-sm font-secondary mr-3"
                style={{ color: 'var(--color-text-light)' }}
              >
                We Accept:
              </span>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <FaCreditCard 
                    className="text-xs"
                    style={{ color: 'var(--color-text-light)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;