import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
export default function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserAvatar(currentUser.avatar);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {};

  return (
    <>
      {currentUserAvatar && currentUserName && (
        <Container>
          <div className="brand">
            <img  className="logo" src={Logo} alt="Logo" />
            <h3>ConnectVerse</h3>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatar}`}
                        alt="avatar"
                      />
                     <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="current-user">
          <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                        alt="avatar"
                      />
                     <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
display: grid;
grid-template-columns: 10% 75% 15%;
overflow: hidden;
background-color: white;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
        height: 2rem;
    }
    .logo{
        height: 5rem;
    }
    h3{
        color: black;
        text-transform: uppercase;
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;  }
}
`;
