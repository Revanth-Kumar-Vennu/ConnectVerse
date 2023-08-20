import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import background from "../assets/background.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate();
  const toastSettings = {
    position: "bottom-right",
    autoClose: 10000,
    draggable: true,
    theme: "light",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = () => {
    const { username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Passwords did not match! Please check your password",
        toastSettings
      );
      return false;
    } else if (username.length <= 3) {
      toast.error(
        "Username is too short! Try a lengthier one with atleast 4 characters",
        toastSettings
      );
      return false;
    } else if (password.length <= 8) {
      toast.error(
        "Password is too weak! Try a lengthier one with atleast 8 characters",
        toastSettings
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastSettings);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));

        toast.success("User added to ConnectVerse!", toastSettings);
        navigate("/");
      }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="name">
            <img src={Logo} alt="Logo" />
            {/* <h1>ConnectVerse</h1> */}
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email-id"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create Account</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fffffff2;
  /* background-image: url(${background});
background-size: cover; 
  background-repeat: no-repeat;
  background-position: center center;
box-shadow: inset; */
  .name {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 10rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #0e9fff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #83cbfc;
      outline: none;
    }
  }
  button {
    background-color: #0e9fff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #83cbfc;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #0e9fff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register;
