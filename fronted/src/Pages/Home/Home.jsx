import React, { useState } from "react";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/SignUp/SignUp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      {/* ===== Navbar ===== */}
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center relative">
        <div className="text-[16px] sm:text-2xl font-bold">🏋️ Gym Management</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 lg:gap-6 font-semibold text-sm md:text-base">
          <li
            className="cursor-pointer hover:text-pink-400"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-pink-400"
            onClick={() =>
              document.getElementById("about").scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-pink-400"
            onClick={() =>
              document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact
          </li>
          <li
            className="cursor-pointer hover:text-pink-400"
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
          >
            Login
          </li>
          <li
            className="cursor-pointer hover:text-pink-400"
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
          >
            Signup
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="medium" />}
        </button>

        {/* Mobile Slide Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-slate-800 text-white transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-6 text-base font-semibold">
            <li
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMenuOpen(false);
              }}
              className="hover:text-pink-400 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
              className="hover:text-pink-400 cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => {
                document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
              className="hover:text-pink-400 cursor-pointer"
            >
              Contact
            </li>
            <li
              onClick={() => {
                setShowLogin(true);
                setShowSignup(false);
                setMenuOpen(false);
              }}
              className="hover:text-pink-400 cursor-pointer"
            >
              Login
            </li>
            <li
              onClick={() => {
                setShowSignup(true);
                setShowLogin(false);
                setMenuOpen(false);
              }}
              className="hover:text-pink-400 cursor-pointer"
            >
              Signup
            </li>
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>

      {/* ===== Hero Section ===== */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-18 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          Welcome To Gym Management System
        </h1>
        <p className="mt-4 text-[15px] sm:text-lg md:text-xl max-w-full sm:max-w-xl text-gray-200">
          Register your gym, manage members, track active & expired memberships,
          and simplify your workflow 🚀
        </p>
        <div className="mt-6 flex flex-row gap-4">
          <button
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold shadow-md w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold shadow-md w-full sm:w-auto"
          >
            Signup
          </button>
        </div>
      </div>

      {/* ===== About Section ===== */}
      <div id="about" className="p-6 sm:p-10 bg-white text-gray-800">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Why Choose Our Gym Management?
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🏢 Register Your Gym</h3>
            <p className="text-sm sm:text-base">Provide your gym name and profile to start managing members efficiently.</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🧑‍🤝‍🧑 Add Members & Memberships</h3>
            <p className="text-sm sm:text-base">Add members, assign monthly memberships, and track subscription status.</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">📊 Track Members</h3>
            <p className="text-sm sm:text-base">View active, inactive, and expired members with clear categories for 3–7 days etc.</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🔄 Renew Memberships</h3>
            <p className="text-sm sm:text-base">Easily renew expired memberships to keep members active and engaged.</p>
          </div>
        </div>
      </div>

      {/* ===== Contact Section ===== */}
      <div id="contact" className="p-6 sm:p-10 bg-gray-100 text-gray-800 text-center mt-15">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-sm sm:text-base">
          Email us at:{" "}
          <span className="text-blue-600 font-semibold">support@gymmanagement.com</span>
        </p>
      </div>

      {/* ===== Login Modal ===== */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-[90%] sm:w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* ===== Signup Modal ===== */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-[90%] sm:w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => setShowSignup(false)}
            >
              ✖
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
