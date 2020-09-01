import React from "react";
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from "@material-ui/core/IconButton";
import {connect, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { hideModal } from "../../redux/modal/modalActions";
import { getUserById } from "../../redux/user/userReducer";

const StartChatButton = ({ hideModal, userId}) => {
  const username = useSelector(({user})=>{
    const u = getUserById(user, userId);
    return u ? u.username : null
  })
  return (
    <IconButton
      onClick={()=>hideModal()}
      aria-label="start chat"
      component={Link}
      to={`/chat/@${username}`}
    >
      <ChatIcon />
    </IconButton>
  );
};

const mapDispatchToProps = dispatch =>  {
    return {
      hideModal: () => dispatch(hideModal())
    }
  }

export default connect(null, mapDispatchToProps)(StartChatButton);
