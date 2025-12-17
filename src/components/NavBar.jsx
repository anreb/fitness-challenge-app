import React from "react";
import "./NavBar.css";

const navItems = [
  { emoji: "🏠", label: "Start" },
  { emoji: "💪", label: "My Challenges" },
  { emoji: "🏆", label: "LeaderBoard" },
  { emoji: "👥", label: "Friends" },
];

function NavBar() {
  return (
    <nav className="navbar">
      {navItems.map((item, index) => (
        <button key={index} className="nav-item">
          <span className="nav-emoji">{item.emoji}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default NavBar;

