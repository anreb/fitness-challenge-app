import React from "react";
import NavBar from "./NavBar";

function FitnessApp() {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="main-content">
        <div id="fitness-app-title">Hello World</div>
      </main>
    </div>
  );
}

export default FitnessApp;
