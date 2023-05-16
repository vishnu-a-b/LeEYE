import React, { useState, useEffect } from "react";
import axios from "axios";

function Update({ location }) {
  const id = localStorage.getItem("Name");
  const [userName, setUserName] = useState(id);
  const [name, setName] = useState(id);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch user data from backend and set state variables
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/${userName}`
        );
        const user = response.data;
        setPassword(user.password);
        setAddress(user.address);
        setImageUrl(user.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userName]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setImage(base64String);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/update", formData);
      setUserName(name);
      alert("Successfully updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Update</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            disabled={true}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <textarea
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageUrl && <img src={imageUrl} alt="User Image" style={{ width: "100px" }} />}
          <button type="submit" className="button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
