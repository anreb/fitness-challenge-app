import React, { useState, useEffect } from "react";
import "./MyChallenges.css";
import MyChallengeCard from "./MyChallengeCard";

const skeletonColors = ["#FB8C00", "#FDD835", "#43A047", "#2E7D32"];

const MyChallenges = ({ onChallengeSelect }) => {
  const [userChallenges, setUserChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user at index 2 from localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      if (users[2]) {
        setUserChallenges(users[2].challenges || []);
      }
    }

    // Show skeleton for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-challenges-page">
      <h1>🔥 My Challenges 🔥</h1>
      <div className="my-challenges-list">
        {isLoading
          ? skeletonColors.map((color, index) => (
              <MyChallengeCard key={index} isLoading={true} skeletonColor={color} />
            ))
          : userChallenges.map((challenge, index) => (
              <MyChallengeCard
                key={index}
                challenge={challenge}
                isLoading={false}
                onClick={() => onChallengeSelect(challenge)}
              />
            ))}
      </div>
    </div>
  );
};

export default MyChallenges;
