import "../assets/Chat.css";
import React, { useRef} from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from "@material-ui/icons/Send";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "../../util/Avatar";
import { useSelector } from "react-redux";

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
   
    boxShadow:theme.shadows[5],
  }
}));

function MessageForm({handleSendMessage}) {
  const classes = useStyles();
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const handleToggleEmojiPicker = () => {
    setOpenEmojiPicker((prev) => !prev);
    inputRef.current.focus();
  };

  const [text, setText] = React.useState("");
  const [selectionEnd, setSelectionEnd] = React.useState(1);
  const handleChange = React.useCallback((e) => {
    setText(e.target.value);setSelectionEnd(e.target.selectionEnd)}, []);

  const onSelectEmoji = React.useCallback((emoji) => {
    const input=inputRef.current;
      let newText= input.value;
      newText=(newText.substring(0,input.selectionStart)+ emoji.native + newText.substring(input.selectionEnd, newText.length))
      setText(newText);
      input.focus();
          
  }, []);

  const inputRef = useRef(null);

  const submitMessage = ()=>{
    if(!!text && text.length > 0){
      handleSendMessage(text);
      setText('');
      inputRef.current.selectionEnd=inputRef.current.selectionStart=0;
    }
  }

  const avatar = useSelector(state => state.session.currentUser.avatar);
  return (
  
    <Box
      display="flex"
      flexDirection="row"
      className={classes.root}
    >
      <Avatar
        src={avatar}
        alt="user profile"
        style={{margin:"5px"}}
      />
        
      <FormControl fullWidth variant="outlined">

      
        <OutlinedInput
          id="outlined-adornment-amount"
          value={text}
          fullWidth
          inputRef={inputRef}
          onChange={handleChange}
          onFocus={(e)=>{e.target.selectionStart= e.target.selectionEnd=selectionEnd}}
          onKeyDown={(e)=>{if((e.key === 'Enter') && !e.shiftKey){submitMessage() } } }
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
