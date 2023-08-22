import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
  
 
    useEffect(() => {
    
      if (currentUser) {
        setCurrentUserAvatar(currentUser.avatar);
        setCurrentUserName(currentUser.username);
      }
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    };
  
  return (
    <>
      {currentUserName && currentUserAvatar && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ConnectVerse</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                alt="avatar"
              />
            </div>
            <div className="username">
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
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */

    img {
      height: 5rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    /* gap: 0.8rem; */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: white;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Box shadow for elevation */

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #83cbfc;
    }
  }

  .current-user {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: black;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;