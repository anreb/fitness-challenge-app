import React from "react";
import "./MyFriendsCard.css";

const MyFriendsCard = ({ username, isLoading }) => {
  if (isLoading) {
    return (
      <div className="my-friends-card my-friends-card--skeleton">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-username"></div>
      </div>
    );
  }

  return (
    <div className="my-friends-card">
      <span className="my-friends-avatar">👤</span>
      <span className="my-friends-username">{username}</span>
    </div>
  );
};

export default MyFriendsCard;

