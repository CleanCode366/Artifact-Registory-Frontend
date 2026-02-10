// Nav.tsx
import { Menu, X } from "lucide-react";
import DesktopHeader from "./DesktopHeader";
import AuthButtons from "./AuthButtons";
import { useNavbar } from "./useNavbar";
import { protectedLinks, publicLinks, publicLinksMobile } from "./NavLinks";
import { type NavProps } from "./types";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

const Nav: React.FC<NavProps> = ({ scrollToSection }) => {
  const {
    mobileNavbarOpen,
    isClosing,
    scrollPosition,
    toggleMobileNavbar,
  } = useNavbar();

  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return <CircularProgress />;

  const linksToShow = isAuthenticated
    ? protectedLinks
    : mobileNavbarOpen
    ? publicLinksMobile
    : publicLinks;

  return (
    <div className="navbar-gradient">
      <DesktopHeader />

      <nav className="navbar-shadow">
        <div className="flex justify-between items-center h-16 px-6">
          <div className="hidden md:flex gap-6">
            {linksToShow.map(link => (
              <NavLink
                to={link.path}
                key={link.label}
                onClick={() => scrollToSection(link.scrollvalue ?? 0)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {mobileNavbarOpen ? (
            <X onClick={toggleMobileNavbar} />
          ) : (
            <Menu onClick={toggleMobileNavbar} />
          )}

          <AuthButtons authenticated={isAuthenticated} />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
