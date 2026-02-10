import { Home, Upload } from "lucide-react";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { type NavItem } from "./types";

export const protectedLinks: NavItem[] = [
  { path: "/home", label: "Home", end: true, scrollvalue: 0, icon: <Home /> },
  { path: "/feed", label: "Feed", end: true, scrollvalue: 0, icon: <DynamicFeedOutlinedIcon /> },
  { path: "/upload", label: "Upload", end: true, scrollvalue: 0, icon: <Upload /> },
  { path: "/profile", label: "Profile", end: true, scrollvalue: 0, icon: <AccountBoxOutlinedIcon /> },
];

export const publicLinks: NavItem[] = [
  { path: "/home", label: "Home", scrollvalue: 60 },
  { path: "/home", label: "Featured Discoveries", scrollvalue: 900 },
  { path: "/home", label: "How it works", scrollvalue: 1550 },
  { path: "/home", label: "Community", scrollvalue: 2100 },
  { path: "/home", label: "Get Started", scrollvalue: 2650 },
];

export const publicLinksMobile: NavItem[] = [
  { path: "/home", label: "Home", scrollvalue: 90 },
  { path: "/home", label: "Featured Discoveries", scrollvalue: 1200 },
  { path: "/home", label: "How it works", scrollvalue: 2200 },
  { path: "/home", label: "Community", scrollvalue: 3300 },
  { path: "/home", label: "Get Started", scrollvalue: 4600 },
];
