import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaSearch,
  FaTv,
  FaFilm,
  FaUser,
  FaHistory,
  FaCog,
  FaHeart,
  FaDragon,
} from "react-icons/fa";

import "./Sidebar.css";

const menuItems = [
  {
    label: "Home",
    icon: <FaHome />,
    path: "/",
  },
  {
    label: "Search",
    icon: <FaSearch />,
    path: "/search",
  },
  {
    label: "TV Shows",
    icon: <FaTv />,
    path: "/tv",
  },
  {
    label: "Movies",
    icon: <FaFilm />,
    path: "/movies",
  },
  {
    label: "Anime",
    icon: <FaDragon />,
    path: "/anime",
  },
  {
    label: "My List",
    icon: <FaHeart />,
    path: "/mylist",
  },
  {
    label: "Watch History",
    icon: <FaHistory />,
    path: "/history",
  },
  {
    label: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Menu Button */}
      <div
        className="menu-btn"
        onMouseEnter={() => setOpen(true)}
      >
        <FaBars />
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`drawer ${open ? "open" : ""}`}
        onMouseLeave={() => setOpen(false)}
      >
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`drawer-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;