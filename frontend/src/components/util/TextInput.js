
import React, { useState, useEffect } from "react";


function TextInput() {
  
  const [messageText, setMessageText] = useState("");

    console.log('Renderizando input');

    const handleChange = (e) =>{
      setMessageText(e.target.value)
    }


  return (
    <input
    type='text'
    className="MessageForm-textInput"
    onChange={handleChange}
    value={messageText}
  />
  );
}

export default TextInput;
