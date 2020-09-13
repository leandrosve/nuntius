import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserById } from "../../../redux/user/userReducer";
import MessageCheckMarker from "./MessageCheckMarker";

const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const MessagePreview = ({ message }) => {
  const { t } = useTranslation();
  const isCurrentUser = useSelector(({ session }) => {
    if (!!message) return session.currentUser.id === message.userId;
  });
  const sender = useSelector(({ user }) => {
    if (!isCurrentUser && !!message) return getUserById(user, message.userId);
  });
 
  return (
    <div>
      <p style={ellipsis}>
        {message && message.details && <MessageCheckMarker {...message} />}
        {isCurrentUser ? t("you") : sender ? sender.alias || sender.name : null}
        {message ? ": " : null}
        {message ? message.text : t("no_messages")}
      </p>
    </div>
  );
};

export default MessagePreview;
