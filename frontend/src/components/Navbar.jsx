import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/')
    setIsDropdownOpen(false)
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptionClick = (option) => {
    console.log(option);
    // Handle the selected dropdown option
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-3xl font-bold tracking-tight">
          -Note<span className="text-orange-400 font-light">Nest</span>-
        </a>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out"
          >
            <img
              src="https://via.placeholder.com/32" // Replace with actual profile image URL
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-500"
            />
            <span className="hidden md:inline">Profile</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleDropdownOptionClick("View Profile")}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  >
                    View Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDropdownOptionClick("Settings")}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
