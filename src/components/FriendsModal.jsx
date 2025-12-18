import React, { useState, useEffect } from "react";
import "./FriendsModal.css";

const FriendsModal = ({ challenge, onClose, onStartChallenge }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Load users from localStorage (exclude current user at index 2)
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers);
      // Filter out current user (index 2) and map with index
      const otherUsers = allUsers
        .map((user, index) => ({ ...user, userIndex: index }))
        .filter((_, index) => index !== 2);
      setUsers(otherUsers);
    }
  }, []);

  const handleUserToggle = (userIndex) => {
    setSelectedUsers((prev) =>
      prev.includes(userIndex)
        ? prev.filter((idx) => idx !== userIndex)
        : [...prev, userIndex]
    );
  };

  const handleStartChallenge = () => {
    if (selectedUsers.length === 0) return;

    // Generate a shared challenge id
    const challengeId = crypto.randomUUID();
    const timestamp = Date.now();

    // Create challenge with first goal checked
    const createChallengeWithFirstGoal = () => ({
      ...challenge,
      id: challengeId,
      goals: challenge.goals.map((goal, idx) => ({
        ...goal,
        completed: idx === 0 ? timestamp : null,
      })),
    });

    // Get stored users
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers);

      // Add challenge to current user (index 2)
      const currentUserChallenge = createChallengeWithFirstGoal();
      allUsers[2].challenges = [
        ...(allUsers[2].challenges || []),
        currentUserChallenge,
      ];

      // Add challenge to each selected friend
      selectedUsers.forEach((userIndex) => {
        const friendChallenge = createChallengeWithFirstGoal();
        allUsers[userIndex].challenges = [
          ...(allUsers[userIndex].challenges || []),
          friendChallenge,
        ];
      });

      localStorage.setItem("users", JSON.stringify(allUsers));

      // Pass the updated challenge back to ChallengeDetail
      onStartChallenge(currentUserChallenge);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">👥 Challenge Friends</h2>
        <p className="modal-subtitle">Select friends to challenge:</p>

        <div className="friends-list">
          {users.map((user) => (
            <label key={user.userIndex} className="friend-item">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.userIndex)}
                onChange={() => handleUserToggle(user.userIndex)}
              />
              <span className="friend-name">{user.username}</span>
            </label>
          ))}
        </div>

        <button
          className={`start-challenge-button ${
            selectedUsers.length === 0 ? "start-challenge-button--disabled" : ""
          }`}
          onClick={handleStartChallenge}
          disabled={selectedUsers.length === 0}
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default FriendsModal;
