import React from "react";
import "./MyChallengeCard.css";

const getProgressColor = (percentage) => {
  if (percentage >= 100) return "#2E7D32"; // Green - Completed
  if (percentage >= 75) return "#43A047"; // Light Green - Almost there
  if (percentage >= 50) return "#FDD835"; // Yellow - Halfway
  if (percentage >= 25) return "#FB8C00"; // Orange - Starting
  return "#FB8C00"; // Default orange for low progress
};

const calculateProgress = (goals) => {
  if (!goals || goals.length === 0) return 0;
  const completedGoals = goals.filter((goal) => goal.completed !== null).length;
  return Math.round((completedGoals / goals.length) * 100);
};

const MyChallengeCard = ({ challenge, isLoading, skeletonColor }) => {
  if (isLoading) {
    return (
      <div
        className="my-challenge-card my-challenge-card--skeleton"
        style={{ backgroundColor: skeletonColor }}
      >
        <div className="skeleton skeleton-name"></div>
        <div className="skeleton skeleton-progress"></div>
      </div>
    );
  }

  const progress = calculateProgress(challenge.goals);
  const progressColor = getProgressColor(progress);

  return (
    <div
      className="my-challenge-card"
      style={{ backgroundColor: progressColor }}
    >
      <span className="my-challenge-name">{challenge.name}</span>
      <span className="my-challenge-progress">{progress}%</span>
    </div>
  );
};

export default MyChallengeCard;
