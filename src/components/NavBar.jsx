import React from "react";
import "./NavBar.css";

const navItems = [
  { id: "start", emoji: "🏠", label: "Start" },
  { id: "challenges", emoji: "💪", label: "My Challenges" },
  { id: "leaderboard", emoji: "🏆", label: "LeaderBoard" },
  { id: "friends", emoji: "👥", label: "Friends" },
];

const NavBar = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? "nav-item--active" : ""}`}
          onClick={() => onTabChange(item.id)}
        >
          <span className="nav-emoji">{item.emoji}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
