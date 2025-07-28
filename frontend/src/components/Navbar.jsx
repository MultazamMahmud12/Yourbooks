import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePersonOff } from "react-icons/md";
import { FaHeart, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../context/Authcontext";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  // ✅ Correct destructuring - useAuth returns an object
  const { currentUser, logOut, loading } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ Show loading state if needed
  if (loading) {
    return (
      <header className="bg-bg shadow-sm border-b" style={{ borderColor: "var(--color-border)" }}>
        <nav className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className="bg-bg shadow-sm border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <nav className="max-w-screen-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Menu & Search */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Hamburger Menu */}
            <button className="p-2 hover:bg-bg-light rounded-md transition-colors">
              <FaBars
                className="h-5 w-5"
                style={{ color: "var(--color-text)" }}
              />
            </button>

            {/* Search Bar */}
            <div className="relative max-w-md w-45">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch
                  className="h-5 w-5"
                  style={{ color: "var(--color-text-light)" }}
                />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search here"
                className="w-full pl-10 pr-4 py-2 bg-bg-light rounded-lg focus:outline-none focus:ring-2 text-sm font-secondary"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  "--tw-ring-color": "var(--color-accent)",
                }}
              />
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 hover:bg-bg-light rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="User" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <FaUser className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 min-w-[180px] bg-white border border-gray-200 shadow-lg rounded-md z-40">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser.displayName || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      {/* Navigation Links */}
                      <ul className="py-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Logout Button */}
                      <div className="py-1 border-t border-gray-200">
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                        >
                          <FaSignOutAlt className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <Link 
                    to="/login" 
                    className="p-2 hover:bg-bg-light rounded-full transition-colors"
                  >
                    <MdOutlinePersonOff className="h-5 w-5 text-gray-500" />
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 hover:bg-bg-light rounded-full transition-colors relative"
            >
              <FaHeart
                className="h-5 w-5"
                style={{ color: "var(--color-text)" }}
              />
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 font-secondary font-medium"
            >
              <FaShoppingCart className="h-4 w-4" />
              <span className="text-sm">{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;