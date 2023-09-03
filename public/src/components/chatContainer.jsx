import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./logout";
import ChatInput from "./chatInput";
import Messages from "./messages";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentSelected, currentUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentSelected._id,
        });
        console.log(response);
        setMessages(response.data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching messages:", error);
      }
    };

    fetchData(); // Call the async function here

    //   return () => {
    //     // Cleanup function (if needed)
    //     // This will be called when the component unmounts
    //   };
  }, [currentSelected]);

  const handleSendMessage = async (message) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentSelected._id,
      message: message,
    });
  };
  return (
    <>
      {currentSelected && (
        <Container>
          <div className="header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentSelected.avatar}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentSelected.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div>
                  <div
                    className={`message ${
                      message.fromSelf ? "sent" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-input">
            <ChatInput handleSendMessage={handleSendMessage} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #0e9fff;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: white;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
