import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("image", image);
      formData.append("address", address);

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
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Address"
        />
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/">Login Page</Link>
    </div>
  );
}

export default SignUp;
