import React, { useState, useEffect } from "react";
import "./Start.css";
import ChallengeCard from "./ChallengeCard";

const Start = ({ onChallengeSelect }) => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load challenges from localStorage
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    }

    // Show skeleton for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="start-page">
      <h1>🏁 Start Challenges 🏁</h1>
      <div className="challenges-list">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ChallengeCard key={index} isLoading={true} />
            ))
          : challenges.map((challenge, index) => (
              <ChallengeCard
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

export default Start;
