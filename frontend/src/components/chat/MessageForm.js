import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import React, { useState , useRef} from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from "@material-ui/icons/Send";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FocusLock, { AutoFocusInside } from 'react-focus-lock';

const useStyles = makeStyles((theme) => ({
  emojiPicker: {
    position: "absolute",
    top: "0",
    right: "0",
    transform: "translateY(-100%)",
    zIndex: theme.zIndex.tooltip - 1,
    marginRight:'15px',
  },
  root:{
    position: "relative",
    width: "100%",
    alignItems: "center",
    background: "white",
    padding:'0px 5px',
    boxShadow:theme.shadows[5],
  }
}));

function MessageForm({handleSubmit}) {
  const classes = useStyles();
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const handleToggleEmojiPicker = () => {
    setOpenEmojiPicker((prev) => !prev);
  };

  const [text, setText] = React.useState("");
  const handleChange = React.useCallback((e) => {setText(e.target.value)}, []);

  const onSelectEmoji = React.useCallback((emoji) => {
    const input=inputRef.current;
      let newText= input.value;
      newText=(newText.substring(0,input.selectionStart)+ emoji.native + newText.substring(input.selectionEnd, newText.length))
      const selectionStart= input.selectionStart;
      setText(newText);
          
  }, []);

  const inputRef = useRef(null);

  const submitMessage = ()=>{
    handleSubmit({text:text, sendTime:new Date(Date.now())});
    setText('');
    inputRef.current.selectionEnd=inputRef.current.selectionStart=0;
  }

 
  return (
  
    <Box
      display="flex"
      flexDirection="row"
      className={classes.root}
    >
      <img
        src={profilePicPlaceholder}
        className="MessageForm-profilePic"
        alt="user profile"
      />
        
      <FormControl fullWidth variant="outlined">

      
        <OutlinedInput
          id="outlined-adornment-amount"
          value={text}
          fullWidth
          inputRef={inputRef}
          onChange={handleChange}
          onKeyDown={(e)=>{if((e.key == 'Enter') && !e.shiftKey){submitMessage() } } }
          variants="filled"
        />
        

      </FormControl>

      <IconButton color="primary" onClick={handleToggleEmojiPicker}>
        <InsertEmoticonIcon style={{ fontSize: "30px" }} />
      </IconButton>

      <IconButton color="secondary" onClick={submitMessage}>
        <SendIcon style={{ fontSize: "50px" }} />
      </IconButton>

  
        <div className={classes.emojiPicker} style={!openEmojiPicker ? {display:'none'}: {display:'block'}}>
          <Picker native onSelect={(emoji) => onSelectEmoji(emoji)} />
        </div>
  
    </Box>
   
  );
}

export default React.memo(MessageForm);
