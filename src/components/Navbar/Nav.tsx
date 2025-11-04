import type React from "react";
import logo from "@assets/Frame.png"
import { NavLink } from "react-router-dom";
import { isAuthenticated, logout } from "@/utils/auth";

interface NavItem {
  path: string;
  label: string;
  end?: boolean;
}

const Nav: React.FC = () => {
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

    return(
        <nav className="backdrop-blur-md bg-secondary-background border-b border-slate-700/50 sticky top-0 z-50 text-primary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/home" className="flex items-center space-x-3">
              <img src={logo} alt="company Logo" className="h-11"/>
              <div>
                <h1 className="text-xl font-bold">Archaeological Inscriptions</h1>
                <p className="text-sm text-slate-400">C-DAC Bangalore</p>
              </div>
            </NavLink>
            <div className="hidden md:flex space-x-6">
              {linksToShow.map(({ path, label, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `hover:text-primary-dark transition-colors ${
                      isActive ? "text-primary-dark font-semibold" : ""
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="flex space-x-3">
              {authenticated && (
                  <button
                    onClick={logout}
                    className="bg-primary-dark hover:bg-primary/80 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout
                  </button>
              )}
              {!authenticated && (
                  <button
                    onClick={logout}
                    className="bg-primary-dark hover:bg-primary/80 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    login
                  </button>
              )}

            </div>
          </div>
        </div>
      </nav>
    )
}

export default Nav;