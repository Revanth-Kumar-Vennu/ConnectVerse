import React from 'react'
import styled from 'styled-components'
import Logout from "./logout";

export default function ChatContainer({currentSelected}) {
  return (
    <>
    {  currentSelected && (
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
        <Logout  />
    </div>
    <div className="chat-messages"></div>
    <div className="chat-input"></div>

   </Container>
    )
    }
    </>
  )
}

const Container = styled.div`
padding-top: 1rem;
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
.user-details{
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar{
        img{
            height: 3rem;
        }
    }
    
}
`;