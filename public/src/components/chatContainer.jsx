import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./logout";
import ChatInput from "./chatInput";
import Messages from "./messages";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";
export default function ChatContainer({ currentSelected, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null)
  const scrollRef= useRef();


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
    if(currentSelected){
    fetchData(); // Call the async function here
    }

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
    socket.current.emit("send-message",{
      to: currentSelected._id,
      from: currentUser._id,
      message: message
    })

    const msgs= [...messages]
    msgs.push({fromSelf: true, message:message})
    setMessages(msgs)
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
        setReceivedMessage({fromSelf: false, message:msg})
      })
    }
  },[])

  useEffect(()=>{
      receivedMessage && setMessages((prev)=>[...prev,receivedMessage])
  },[receivedMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smoooth"})
  },[messages])
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
                <div ref={scrollRef} key={uuidv4()}>
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
  gap: 0.1rem;
  overflow: hidden;
  &::-webkit-scrollbar{
    width: 0%.2rem;
    &-thumb{
      background-color: black;
      width: 0%.1rem;
      border-radius: 1rem;
    }
  }
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
  @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 15% 70% 15%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 45% 55%;
    }
`;
