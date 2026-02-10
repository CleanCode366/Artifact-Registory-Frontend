import type { ReactNode } from "react";

export interface NavItem {
  path: string;
  label: string;
  icon?: ReactNode;
  end?: boolean;
  scrollvalue?: number;
}

export interface NavProps {
  scrollToSection: (position: number) => void;
}
