import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logos/master-ielts-logo.png"
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen);

  const {isAuthenticated, logout} = useAuth()  

  // Reusable NavLink styles
  const linkClasses = ({ isActive }) =>
    `hover:text-[#0554F2] transition ${
      isActive ? "text-[#0554F2] font-semibold" : "text-gray-700"
    }`;

    const handleAuth = ()=> {
      if (isAuthenticated) {
        logout()
      } else {
        navigate("/login")
      }
    }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="w-2/3 mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-[#0554F2] cursor-pointer">
          <img src={logo} alt="master ielts logo" className="w-24" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className={linkClasses}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={linkClasses}>
              Courses
            </NavLink>
          </li>
           <li>
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClasses}>
              Contact Us
            </NavLink>
          </li>
         
          {/* <li>
            <NavLink to="/cart" className={linkClasses}>
              Cart
            </NavLink>
          </li> */}
          <li>
            <button
              onClick={handleAuth}
              className="hover:text-[#0554F2] transition text-gray-700 cursor-pointer"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden text-2xl text-gray-700 cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 px-6 py-6 font-medium">
            <li>
              <NavLink to="/" className={linkClasses} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={linkClasses} onClick={toggleMenu}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={linkClasses} onClick={toggleMenu}>
                Courses
              </NavLink>
            </li>
             <li>
              <NavLink to="/dashboard" className={linkClasses} onClick={toggleMenu}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClasses} onClick={toggleMenu}>
                Contact Us
              </NavLink>
            </li>
           
            {/* <li>
              <NavLink to="/cart" className={linkClasses} onClick={toggleMenu}>
                Cart
              </NavLink>
            </li> */}
            <li>
              <button
                onClick={() => {
                  handleAuth();
                  toggleMenu();
                }}
                className="hover:text-[#0554F2] transition text-gray-700 cursor-pointer"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
