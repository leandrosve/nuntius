import React, { useCallback } from "react";
import { List, Typography, Button } from "@material-ui/core";
import { getContactIds } from "../../redux/user/userReducer";
import UserListItem from "../user/UserListItem";
import { useSelector, useDispatch } from "react-redux";
import { getChatById } from "../../redux/chats/chatReducer";
import { difference } from "lodash";
import { useTranslation } from "react-i18next";
import Alert from "../util/Alert";
import AddParticipantButton from "./AddParticipantButton";
import { openContacts as openContactsAction } from "../../redux/modal/modalActions";

const flexColumn = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  width:"100%"
};
const AddParticipants = ({ chatId }) => {
  const chat = useSelector((state) => getChatById(state.chat, chatId));
  const allContactIds = useSelector((state) => getContactIds(state.user));
  const contactIds = difference(allContactIds, chat.userIds);
  const dispatch = useDispatch();
  const openContacts = useCallback(()=>{dispatch(openContactsAction())},[dispatch]);
  const { t } = useTranslation();
  return (
    <div style={flexColumn}>
      <Typography variant="subtitle1">{t("participants_add")}</Typography>
      {allContactIds.length <= 0 ? (
        <>
          <Typography variant="body2">{t("contacts_empty")}</Typography>
          <Button onClick={openContacts}>{t("contacts_add")}</Button>
        </>
      ) : (
        contactIds.length === 0 && (
          <Alert open={true} severity="info" isDismissible={false}>
            <div style={flexColumn}>
              <Typography>{t("participants_add_full")}</Typography>

              <Button onClick={openContacts}>{t("contacts_search_new")}</Button>
            </div>
          </Alert>
        )
      )}
      {contactIds.length > 0 && (
        <List
          style={{
            maxHeight: "400px",
            overflow: "auto",
            margin: "0px",
            minHeight: "50px",
          }}
        >
          {contactIds.map((id) => (
            <UserListItem key={id} userId={id} 
                actions={
                    <AddParticipantButton chatId={chatId} userId={id}/>
                }
            />
          ))}
        </List>
      )}
    </div>
  );
};

export default AddParticipants;
