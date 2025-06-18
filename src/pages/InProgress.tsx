import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Assuming global styles are defined here

const InProgress: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img
        src="/logo.png"
        alt="In Progress"
        className="w-32 h-32 mb-6 animate-bounce"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Page Under Construction
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        We are working hard to bring this page to life. Please check back later!
      </p>
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};

export default InProgress;
