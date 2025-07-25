import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePersonOff } from "react-icons/md";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
const navigation = [
  { name: "orders", href: "/orders" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const currentUser = true;
  console.log(isDropdownOpen);
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
            
            <div className="relative">
              {currentUser ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 hover:bg-bg-light rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <FaUser className="h-4 w-4 text-white" />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 min-w-[160px] bg-white border border-gray-200 shadow-lg rounded-md z-40">
                      <ul className="py-2">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <Link to="/login" className="p-2 hover:bg-bg-light rounded-full transition-colors">
                    <MdOutlinePersonOff className="h-5 w-5 text-gray-500" />
                  </Link>
                </div>
              )}
            </div>
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
              <span className="text-sm">0</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
