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

function Browse({ fetchContacts, fetchProfileImage }) {
  useEffect(() => fetchContacts(), [fetchContacts]);
  const currentUserId = useSelector((state) => state.session.currentUser.id);
  useEffect(()=>fetchProfileImage(currentUserId, [fetchProfileImage, currentUserId]))
  return (
    <div>
      <Nav />
      <div className="Browse-content">
      
        <MessageSource/>

        <ChatListContainer />
        <div className="Chat" style={{ position: "relative" }}>
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

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(contacts()),
  fetchProfileImage: (id) => dispatch(fetchProfileImage(id))
});

export default connect(null, mapDispatchToProps)(Browse);
