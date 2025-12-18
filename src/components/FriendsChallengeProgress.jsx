import React, { useState, useEffect } from "react";
import "./FriendsChallengeProgress.css";

const calculateProgress = (goals) => {
  if (!goals || goals.length === 0) return 0;
  const completedGoals = goals.filter((goal) => goal.completed !== null).length;
  return Math.round((completedGoals / goals.length) * 100);
};

const FriendsChallengeProgress = ({ challengeId }) => {
  const [friendsProgress, setFriendsProgress] = useState([]);

  useEffect(() => {
    if (!challengeId) return;

    // Load users from localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers);

      // Find users who have a challenge with the same id (exclude current user at index 2)
      const friends = allUsers
        .map((user, index) => ({ ...user, userIndex: index }))
        .filter((user, index) => index !== 2)
        .map((user) => {
          const matchingChallenge = user.challenges?.find(
            (c) => c.id === challengeId
          );
          if (matchingChallenge) {
            return {
              username: user.username,
              progress: calculateProgress(matchingChallenge.goals),
            };
          }
          return null;
        })
        .filter(Boolean);

      setFriendsProgress(friends);
    }
  }, [challengeId]);

  if (friendsProgress.length === 0) return null;

  return (
    <div className="friends-challenge-progress">
      <h3>👥 Friends Progress</h3>
      <div className="friends-progress-list">
        {friendsProgress.map((friend, index) => (
          <div key={index} className="friend-progress-item">
            <span className="friend-progress-name">{friend.username}</span>
            <div className="friend-progress-bar-container">
              <div
                className="friend-progress-bar"
                style={{ width: `${friend.progress}%` }}
              ></div>
            </div>
            <span className="friend-progress-percentage">{friend.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsChallengeProgress;

