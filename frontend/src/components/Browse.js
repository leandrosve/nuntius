import React, { useEffect } from "react";
import "../App.css";
import Nav from "./nav/Nav";
import ChatContainer from "./chat/ChatContainer";
import ChatListContainer from "./chat/ChatListContainer";
import { contacts } from "../redux/contacts/contactActions";
import { connect } from "react-redux";
import ChatWelcome from "./chat/ChatWelcome";
import { Route, Switch } from "react-router-dom";
import MessageSource from "./chat/message/MessageSource";



function Browse({ fetchContacts }) {
  useEffect(() => fetchContacts(), [fetchContacts]);


  return (
    <div>
      
      
      <Nav />
      <div className="Browse-content">
        <ChatListContainer />
        <div className="Chat" style={{position:"relative"}}>
          <Switch>
            <Route path={[`/chat/@:username`, `/chat/group/:groupId`]} component={ChatContainer} />
            <ChatWelcome />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(contacts()),
});

export default connect(null, mapDispatchToProps)(Browse);
