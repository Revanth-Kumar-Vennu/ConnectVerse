import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/contacts";
function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("chat-app-user");
        if (!storedUser) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [navigate]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser && currentUser.isAvatarSet) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } else if (currentUser) {
          navigate("/setAvatar");
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  return (
    <Container>
      <div className="container">
      <Contacts contacts={contacts} currentUser={currentUser}></Contacts>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: white;
    display: grid;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 45% 55%;
    }
  }
`;
export default Chat;
