import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../../context/ThemeProvider";
import restaurant_logo from "../../assets/restaurant_logo.png";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        title: "Logout Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        title: "Logout Failed!",
        text: "An error occurred while logging out.",
        icon: "error",
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#4f46e5",
        color: theme === "dark" ? "#f9fafb" : "#ffffff",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            style={{
              backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
              color: theme === "dark" ? "#f9fafb" : "#000000",
            }}
          >
            <li>
              <Link to="/" style={{ color: "inherit" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-foods" style={{ color: "inherit" }}>
                All Foods
              </Link>
            </li>
            <li>
              <Link to="/gallery" style={{ color: "inherit" }}>
                Gallery
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold"
          style={{ color: "inherit" }}
        >
          <img
            src={restaurant_logo}
            alt="Logo"
            className="h-14 w-14 rounded-full"
          />
          <span>Culinary Canvas</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" style={{ color: "inherit" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/all-foods" style={{ color: "inherit" }}>
              All Foods
            </Link>
          </li>
          <li>
            <Link to="/gallery" style={{ color: "inherit" }}>
              Gallery
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <button onClick={toggleTheme} className="btn btn-ghost">
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.354a8 8 0 000 15.292 8 8 0 000-15.292zM12 2a10 10 0 110 20 10 10 0 010-20zm0 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.354a8 8 0 000 15.292 8 8 0 000-15.292zM12 2a10 10 0 110 20 10 10 0 010-20zm0 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" />
            </svg>
          )}
        </button>
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    currentUser.photoURL || "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                />
              </div>
            </label>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52"
                style={{
                  backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                  color: theme === "dark" ? "#f9fafb" : "#000000",
                  zIndex: 1000, 
                  position: "absolute", 
                }}
              >
                <li className="font-bold text-center">
                  {currentUser.displayName || "User"}
                </li>
                <li>
                  <Link to="/my-foods" style={{ color: "inherit" }}>
                    My Foods
                  </Link>
                </li>
                <li>
                  <Link to="/add-food" style={{ color: "inherit" }}>
                    Add Food
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" style={{ color: "inherit" }}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error w-full"
                    style={{ color: "inherit" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
