import React, { useState, useEffect } from "react";
import "./MyFriends.css";
import MyFriendsCard from "./MyFriendsCard";

const MyFriends = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Show skeleton for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-friends-page">
      <h1>👥 My Friends 👥</h1>
      <div className="my-friends-list">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <MyFriendsCard key={index} isLoading={true} />
            ))
          : users.map((user, index) => (
              <MyFriendsCard key={index} username={user.username} isLoading={false} />
            ))}
      </div>
    </div>
  );
};

export default MyFriends;
