import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  async function submit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("image", image);
      formData.append("address", address);
      console.log(formData)
      await axios
        .post("http://localhost:8000/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: name } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="login">
        <h1>Signup</h1>

        <form action="POST">
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: "100px" }} />
          )}
          <textarea 
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
          />
          <input type="submit" value="Register" className="button" onClick={submit} />
        </form>

        <br />
        <p>OR</p>
        <br />

        <Link to="/">Login Page</Link>
      </div>
    </div>
  );
}

export default SignUp;
