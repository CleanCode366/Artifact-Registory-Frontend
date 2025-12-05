import { useEffect, useState, useRef } from 'react';

interface ScrollShrinkOptions {
  threshold?: number;
}

export const useScrollShrink = ({ threshold }: ScrollShrinkOptions = {}) => {
  const [shouldShrink, setShouldShrink] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const navHeight = nav.offsetHeight;
    const scrollThreshold = threshold ?? (navHeight / 2); // Trigger at half the navbar height

    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setShouldShrink(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { navRef, shouldShrink };
};