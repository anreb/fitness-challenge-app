import React, { useState, useEffect } from "react";
import "./ChallengeDetail.css";
import FriendsModal from "./FriendsModal";
import FriendsChallengeProgress from "./FriendsChallengeProgress";

const ChallengeDetail = ({ challenge, onBack }) => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [showModal, setShowModal] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);

  useEffect(() => {
    setCurrentChallenge(challenge);
  }, [challenge]);

  const handleGoalCheck = (goalIndex) => {
    const goal = currentChallenge.goals[goalIndex];

    // Don't allow unchecking
    if (goal.completed !== null) return;

    // Create updated goals with timestamp
    const updatedGoals = currentChallenge.goals.map((g, idx) =>
      idx === goalIndex ? { ...g, completed: Date.now() } : g
    );

    let updatedChallenge;

    if (!currentChallenge.id) {
      // New challenge from Start - create copy with new id
      updatedChallenge = {
        ...currentChallenge,
        id: crypto.randomUUID(),
        goals: updatedGoals,
      };

      // Add to user[2] challenges in localStorage
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        if (users[2]) {
          users[2].challenges = [
            ...(users[2].challenges || []),
            updatedChallenge,
          ];
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    } else {
      // Existing challenge from My Challenges - update in localStorage
      updatedChallenge = {
        ...currentChallenge,
        goals: updatedGoals,
      };

      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        if (users[2]) {
          users[2].challenges = users[2].challenges.map((c) =>
            c.id === currentChallenge.id ? updatedChallenge : c
          );
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }

    setCurrentChallenge(updatedChallenge);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartChallenge = (updatedChallenge) => {
    // Update current challenge with the new challenge from modal
    setCurrentChallenge(updatedChallenge);
    // Refresh the friends progress component
    setRefreshProgress((prev) => prev + 1);
  };

  const completedCount = currentChallenge.goals.filter(
    (g) => g.completed !== null
  ).length;
  const totalCount = currentChallenge.goals.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Hide Challenge Friends button once challenge has been started (has id and at least one goal completed)
  const isChallengeStarted = currentChallenge.id && completedCount > 0;

  return (
    <div className="challenge-detail">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <h1 className="challenge-detail-title">{currentChallenge.name}</h1>

      {!isChallengeStarted && (
        <button className="challenge-friends-button" onClick={handleOpenModal}>
          👥 Challenge Friends
        </button>
      )}

      <div className="challenge-section">
        <h3>📝 Description</h3>
        <p>{currentChallenge.description}</p>
      </div>

      <div className="challenge-section">
        <h3>⏱️ Duration</h3>
        <p>{currentChallenge.duration}</p>
      </div>

      <div className="challenge-section">
        <h3>
          🎯 Goals ({completedCount}/{totalCount} - {progress}%)
        </h3>
        <div className="goals-list">
          {currentChallenge.goals.map((goal, index) => (
            <label
              key={index}
              className={`goal-item ${
                goal.completed !== null ? "goal-item--completed" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={goal.completed !== null}
                onChange={() => handleGoalCheck(index)}
                disabled={goal.completed !== null}
              />
              <span className="goal-name">{goal.name}</span>
              <span className="goal-calories">🔥 {goal.calories} cal</span>
            </label>
          ))}
        </div>
      </div>

      {currentChallenge.id && (
        <FriendsChallengeProgress
          key={refreshProgress}
          challengeId={currentChallenge.id}
        />
      )}

      {showModal && (
        <FriendsModal
          challenge={currentChallenge}
          onClose={handleCloseModal}
          onStartChallenge={handleStartChallenge}
        />
      )}
    </div>
  );
};

export default ChallengeDetail;
