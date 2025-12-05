import React, { useState, useEffect, useRef } from "react";
import logo from "@assets/Frame1.png"
import { NavLink } from "react-router-dom";
import { isAuthenticated, logout } from "@/utils/auth";
import { Menu } from "lucide-react";
import meityLogo from "@assets/meitylogo2.png";

interface NavItem {
  path: string;
  label: string;
  end?: boolean;
}

const Nav: React.FC = ({ scrollToSection }) => {
  const authenticated = isAuthenticated();


  const protectedLinks: NavItem[] = [
    { path: "/home", label: "Home", end: true },
    { path: "/feed", label: "Feed", end: true },
    { path: "/upload", label: "Upload", end: true },
    { path: "/profile", label: "Profile", end: true },
  ];

  const publicLinks: NavItem[] = [
    // { path: "/login", label: "Login", end: true },
  ];

  const linksToShow = authenticated ? protectedLinks : publicLinks;
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []); // Empty dependency array ensures the effect runs only once on mount and unmount

  return (
    <div className="navbar-gradient" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <nav className={`top-0 z-50 text-secondary-text navbar-shadow ${scrollPosition > 64 ? "navscrollbehavior" : "w-100C"}`} style={{ backgroundColor: "transparent" }} >
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <NavLink to="/home" className="flex items-center space-x-3">
              {/* <img src={meityLogo} alt="company Logo" className="h-11" /> */}
              <img src={logo} alt="company Logo" className="h-11" />
              <div>
                <h1 className="text-xl font-bold text-primary-text">Archaeological Inscriptions</h1>
                <p className="text-sm text-primary-text">C-DAC Bangalore</p>
              </div>
            </NavLink>
            <div className="hidden md:flex space-x-6">
              {linksToShow.map(({ path, label, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `hover:text-primary-dark transition-colors ${isActive ? "text-primary-dark font-semibold" : ""
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="flex justify-between items-center space-x-3">
              {authenticated ? "" : (<div className="pt-2 navbar-list">
                <ul className="space-y-2 flex-row text-white footer-links" style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(0) }}><a className="footer-link-item-anchor transition-colors">Home</a></li>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(780) }}><a className="footer-link-item-anchor transition-colors">Featured Discoveries</a></li>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(1500) }}><a className="footer-link-item-anchor transition-colors">How it works</a></li>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(2000) }}><a className="footer-link-item-anchor transition-colors">Recent Discoveries</a></li>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(2800) }}><a className="footer-link-item-anchor transition-colors">Community</a></li>
                  <li className="footer-link-items cursor-pointer" onClick={() => { scrollToSection(3400) }}><a className="footer-link-item-anchor transition-colors">Start</a></li>
                </ul>
              </div>)}
              <div className="ps-4 flex items-center justify-between">

                {authenticated && (
                  <button
                    onClick={logout}
                    className="bg-primary-dark cursor-pointer hover:bg-primary/80 px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ border: "0.1rem solid white" }}
                  >
                    Logout
                  </button>
                )}
                {!authenticated && (
                  <button
                    onClick={logout}
                    className="bg-primary-light cursor-pointer text-primary-text hover:bg-primary/80 px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ border: "0.1rem solid white" }}

                  >
                    Login
                  </button>
                )}
                {/* <Menu size={0} className="hamburger-icon ms-2" /> */}
              </div>

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;