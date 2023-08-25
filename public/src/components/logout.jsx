import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import {BiPowerOff}  from 'react-icons/bi'
export default function Logout() {
    const navigate=useNavigate()
    const handleClick = async ()=>{
localStorage.clear()
navigate("/login")
    }
  return (
    <Button  onClick={handleClick}>
        <BiPowerOff></BiPowerOff>
    </Button>
  )
}

const Button=styled.button`
display: flex;
align-items: center;
justify-content: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: white;
border: none;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
cursor: pointer;
svg{
    font-size: 1.5rem;
    color:#0e9fff;
}

`;
