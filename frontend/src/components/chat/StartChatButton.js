import React from "react";
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { hideModal } from "../../redux/modal/modalActions";

const StartChatButton = ({ hideModal, username}) => {
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
