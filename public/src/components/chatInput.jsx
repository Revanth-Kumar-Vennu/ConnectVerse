import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

export default function ChatInput({handleSendMessage}) {
  const [showEmojiPicker, setShowEmojiPicker]=useState(false)
  const [message,setMessage]=useState("")
  const handleEmojiPicker = () =>{
    setShowEmojiPicker(!showEmojiPicker)
  }
  const handleEmojiClick = (emojiObject, event) =>{
    console.log(emojiObject)
   let msg = message;
   msg += emojiObject.emoji
   setMessage(msg)
  }
  const sendChat = (event) =>{
    event.preventDefault();
    if(message.length>0){
      handleSendMessage(message);
      setMessage("");
      
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker}/>
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(event)=> sendChat(event)}>
        <input type="text" placeholder='Type your message here.....' value={message} onChange={(event) => setMessage(event.target.value)}></input>
        <button className='submit'><IoMdSend/></button>
      </form>
    </Container>
    )
}
const Container = styled.div`
display:grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: white;
padding: 0 2rem;
padding-bottom: 0.3rem;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
border-radius: 5rem;
.button-container{
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #0e9fff;
  margin-top: 0.5rem;
 


.emoji{
svg{
  position: relative;
  font-size: 1.5rem;
  color:#0e9fff ;
  cursor: pointer;
}
.EmojiPickerReact{
  position: absolute;
  top:35%;
  .emoji-categories{
    button{
      filter: contrast(0);
    }
  }
  .emoji-search{
    background-color: transparent;
  }
  .emoji-scroll-wrapper::-webkit-scrollbar{
    background-color: white;
    width: 5px;

  }
 
}
}
}

.input-container{
  width: 100%;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  /* background-color: #ffffff96; */

  input{
    width: 90%;
    height: 60%;
  
    color: black;
    border: none;
    padding-left: 1rem;
    font-size:1.2rem;

    &:focus{
outline: none;
    }
  }
button{
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
  svg{
    font-size: 2rem;
    color: #0e9fff;
  }
}
 
 
}
`;


