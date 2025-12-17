import React from "react";
import "./ChallengeCard.css";

const ChallengeCard = ({ challenge, isLoading }) => {
  if (isLoading) {
    return (
      <div className="challenge-card challenge-card--skeleton">
        <div className="skeleton skeleton-name"></div>
        <div className="skeleton skeleton-duration"></div>
      </div>
    );
  }

  return (
    <div className="challenge-card">
      <span className="challenge-name">{challenge.name}</span>
      <span className="challenge-duration">⏱️{challenge.duration}</span>
    </div>
  );
};

export default ChallengeCard;
