import React from 'react'
import styled from 'styled-components'
import robot from '../assets/welcome_robot.gif'
export default function Welcome({currentUser}) {
  return (
   <Container>
    <img src={robot} alt="robot" />
    <h1>
        Welcome to the ConnectVerse, <span>{currentUser.username}!</span>
    </h1>
    <h3>Click on the user to start connecting!</h3>
   </Container>
  )
}

const Container = styled.div`
align-items: center;
display: flex;
justify-content: center;
flex-direction: column;
color: black;

img{
    height: 20rem;
}
span{
    color: #83cbfc;
}
`
