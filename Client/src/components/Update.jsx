import React, { useState, useEffect } from "react";
import axios from "axios";

function Update({ location }) {
  const [userName, setUserName] = useState("abcdef");
  const [name, setName] = useState("abcdef");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8000/update", formData);
      setUserName(name)
      alert("Successfully updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update");
    }
  };

  return (
    <div className="update">
      <h1>Update</h1>
      <img src={imageUrl} alt="User Image" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
