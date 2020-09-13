import React, { useEffect } from "react";
import "../App.css";
import Nav from "./nav/Nav";
import ChatContainer from "./chat/ChatContainer";
import ChatListContainer from "./chat/ChatListContainer";
import { contacts } from "../redux/contacts/contactActions";
import { connect, useSelector } from "react-redux";
import ChatWelcome from "./chat/ChatWelcome";
import { Route, Switch } from "react-router-dom";
import MessageSource from "./chat/message/MessageSource";
import { fetchProfileImage } from "../redux/user/userActions";
import { ADD_GROUP_REQUEST } from "../redux/chats/groups/groupActionTypes";
import { Snackbar } from "@material-ui/core";
import SmartAlert from "./util/SmartAlert";
import { LEAVE_CHAT_REQUEST } from "../redux/chats/chatActionTypes";

function Browse({ fetchContacts, fetchProfileImage }) {
  useEffect(() => fetchContacts(), [fetchContacts]);
  const currentUserId = useSelector((state) => state.session.currentUser.id);
  useEffect(()=>{if(!!currentUserId)fetchProfileImage(currentUserId)}, [fetchProfileImage, currentUserId])
  return (
    <div>
      <Nav />
      <div className="Browse-content">
      
        <MessageSource/>

        <ChatListContainer />

        <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  autoHideDuration={6000}>        
          <SmartAlert concerns={snackbarConcerns}/>     
        </Snackbar>
        <div  style={{ color:"white",  display:"flex", flexDirection:"column", flexGrow:1, justifyItems:"center", alignContent:"center", position: "relative" }}>
          <Switch>
            <Route
              path={[`/chat/@:username`, `/chat/group/:groupId`]}
              component={ChatContainer}
            />
            <ChatWelcome />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const snackbarConcerns=[ADD_GROUP_REQUEST, LEAVE_CHAT_REQUEST];

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(contacts()),
  fetchProfileImage: (id) => dispatch(fetchProfileImage(id))
});

export default connect(null, mapDispatchToProps)(Browse);
