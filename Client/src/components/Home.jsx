import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate("/update", { state: { id: location.state.id } });
  };

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to the home</h1>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
}

export default Home;
