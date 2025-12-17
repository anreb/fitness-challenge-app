import React from "react";
import "./LeaderboardCard.css";

const getMedal = (place) => {
  switch (place) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return null;
  }
};

const LeaderboardCard = ({ place, username, isLoading }) => {
  if (isLoading) {
    return (
      <div className="leaderboard-card leaderboard-card--skeleton">
        <div className="skeleton skeleton-place"></div>
        <div className="skeleton skeleton-username"></div>
      </div>
    );
  }

  const medal = getMedal(place);

  return (
    <div
      className={`leaderboard-card ${
        place <= 3 ? "leaderboard-card--top" : ""
      }`}
    >
      <span className="leaderboard-place">{place}</span>
      <span className="leaderboard-username">{username}</span>
      {medal && <span className="leaderboard-medal">{medal}</span>}
    </div>
  );
};

export default LeaderboardCard;
