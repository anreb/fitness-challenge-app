import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import LeaderboardCard from "./LeaderboardCard";

const countCompletedGoals = (user) => {
  if (!user.challenges) return 0;
  return user.challenges.reduce((total, challenge) => {
    const completed = challenge.goals.filter((goal) => goal.completed !== null).length;
    return total + completed;
  }, 0);
};

const Leaderboard = () => {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load users from localStorage and sort by completed goals
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const sorted = [...users].sort((a, b) => {
        return countCompletedGoals(b) - countCompletedGoals(a);
      });
      setRankedUsers(sorted);
    }

    // Show skeleton for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="leaderboard-page">
      <h1>🏆 Leaderboard 🏆</h1>
      <div className="leaderboard-list">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <LeaderboardCard key={index} isLoading={true} />
            ))
          : rankedUsers.map((user, index) => (
              <LeaderboardCard
                key={index}
                place={index + 1}
                username={user.username}
                isLoading={false}
              />
            ))}
      </div>
    </div>
  );
};

export default Leaderboard;
