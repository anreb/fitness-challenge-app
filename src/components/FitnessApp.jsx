import React, { useState } from "react";
import NavBar from "./NavBar";
import Start from "./Start";
import MyChallenges from "./MyChallenges";
import Leaderboard from "./Leaderboard";
import MyFriends from "./MyFriends";

const FitnessApp = () => {
  const [activeTab, setActiveTab] = useState("start");

  const renderContent = () => {
    switch (activeTab) {
      case "start":
        return <Start />;
      case "challenges":
        return <MyChallenges />;
      case "leaderboard":
        return <Leaderboard />;
      case "friends":
        return <MyFriends />;
      default:
        return <Start />;
    }
  };

  return (
    <div className="app-layout">
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default FitnessApp;
