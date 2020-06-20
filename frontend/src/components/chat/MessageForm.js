import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import React, { useState} from "react";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Emoji } from "emoji-mart";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from '@material-ui/icons/Send';


function MessageForm() {
  console.log("Renderizando form entero");

  const InputText = ()=>{
    const [messageText, setMessageText] = useState("");

    const handleChange = (e) => {
      setMessageText(e.target.value);
    };  
    return(
      <FormControl fullWidth variant="outlined">
      <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            rows={2}
            variants='filled'
            endAdornment={<InputAdornment position="end"><IconButton color="primary">
            <InsertEmoticonIcon style={{fontSize:'30px'}} />
          </IconButton></InputAdornment>}
      
          />
     </FormControl>
    )
  }

  
  return (
    <React.Fragment>
      <img
        src={profilePicPlaceholder}
        className="MessageForm-profilePic"
        alt='user profile'
      />
       
      <InputText/>

      <IconButton color="secondary">
            <SendIcon style={{fontSize:'50px'}} />
      </IconButton>
      

      
    </React.Fragment>
  );
}

export default React.memo(MessageForm);
