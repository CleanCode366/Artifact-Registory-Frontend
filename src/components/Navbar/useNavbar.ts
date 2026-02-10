// useNavbar.ts
import { useState, useEffect } from "react";

export const useNavbar = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileNavbar = () => {
    if (mobileNavbarOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMobileNavbarOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setMobileNavbarOpen(true);
    }
  };

  return {
    mobileNavbarOpen,
    isClosing,
    scrollPosition,
    toggleMobileNavbar,
    setMobileNavbarOpen,
  };
};
