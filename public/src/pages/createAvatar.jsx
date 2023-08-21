import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loading.gif";
import styled from "styled-components";
import background from "../assets/background.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
export default function CreateAvatar() {

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
  })

  const toastSettings = {
    position: "bottom-right",
    autoClose: 10000,
    draggable: true,
    theme: "light",
  };
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const api = "https://api.multiavatar.com";
  const apiKey = "zTk3d02FRPjJU4"
  const navigate = useNavigate();

  const setMyAvatar = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastSettings);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );

      const { data } = await axios.post(`${createAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar],
      });
      console.log(data)
      if (data.isSet) {
        user.isAvatarSet = true;
        user.avatar = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error while creating your avatar! Please try again.", toastSettings);
      }
    }
  }
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`, {
            responseType: 'arraybuffer',
          });
        
          console.log('Raw response data:', response.data);
        
          const buffer = Buffer.from(response.data, 'binary');
          const base64Data = buffer.toString('base64');
          console.log('Base64 data:', base64Data);
        
          data.push(base64Data);
        } catch (error) {
          console.error('Error fetching avatar:', error);
        }
      }

      if (isMounted) {
        setAvatar(data);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
    {
      isLoading ?  <Container>
        <img src={loader} alt="loader" className="loader"/>
      </Container> :
  
      <Container>
        <div className="title">
          <h1>Pick an avatar of your choice</h1>
        </div>
        <div className="avatars">
          {avatar.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                ></img>
              </div>
            );
          })}
        </div>
        <button className="btn-submit" onClick={setMyAvatar}>Set as my Avatar</button>
      </Container>
        }
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: white;
  justify-content: center;
  align-items: center;

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      transition: 0.5s ease-in-out;
      img {
        height: 5rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.5rem solid #0e9fff;
    }
  }
  .btn-submit {
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    background-color: #0e9fff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    &:hover {
      background-color: #83cbfc;
    }
  }
  .loader {
    max-inline-size: 40%;
  }

`;
