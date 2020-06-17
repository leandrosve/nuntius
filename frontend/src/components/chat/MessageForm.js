import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import React, { useState} from "react";
import { AiOutlineSmile } from "react-icons/ai";


function MessageForm() {
  console.log("Renderizando form entero");
  const [chosenEmoji, setChosenEmoji] = useState(null);



  const InputText = ()=>{
    const [messageText, setMessageText] = useState("");

    const handleChange = (e) => {
      setMessageText(e.target.value);
    };  
    return(
      <input
        type="text"
        className="MessageForm-textInput"
        onChange={handleChange}
        value={messageText}
      />
    )
  }

  
  return (
    <div className="MessageForm">
      <img
        src={profilePicPlaceholder}
        className="MessageForm-profilePic"
        alt="user profile picture"
      />
      
      <InputText/>
      <span>
        <AiOutlineSmile className="MessageForm-emojiPicker-button" />
      </span>

      
    </div>
  );
}

export default React.memo(MessageForm);
