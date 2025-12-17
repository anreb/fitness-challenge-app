import React, { useState } from "react";
import NavBar from "./NavBar";
import Start from "./Start";
import MyChallenges from "./MyChallenges";
import Leaderboard from "./Leaderboard";
import MyFriends from "./MyFriends";
import ChallengeDetail from "./ChallengeDetail";

const FitnessApp = () => {
  const [activeTab, setActiveTab] = useState("start");
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleBackFromDetail = () => {
    setSelectedChallenge(null);
  };

  const handleTabChange = (tab) => {
    setSelectedChallenge(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (selectedChallenge) {
      return (
        <ChallengeDetail
          challenge={selectedChallenge}
          onBack={handleBackFromDetail}
        />
      );
    }

    switch (activeTab) {
      case "start":
        return <Start onChallengeSelect={handleChallengeSelect} />;
      case "challenges":
        return <MyChallenges onChallengeSelect={handleChallengeSelect} />;
      case "leaderboard":
        return <Leaderboard />;
      case "friends":
        return <MyFriends />;
      default:
        return <Start onChallengeSelect={handleChallengeSelect} />;
    }
  };

  return (
    <div className="app-layout">
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default FitnessApp;
