import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  localStorage.setItem('Name', location.state.id);
  const handleUpdateClick = () => {
    navigate("/update", { state: { id: location.state.id } });
  };

  return (
    <div className="container">
      <h1>Hello {location.state.id} and welcome to the home</h1><br></br>
      <button  onClick={handleUpdateClick}>Update Profile</button>
    </div>
  );
}

export default Home;
