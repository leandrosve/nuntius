import React from "react";
import { BsCheckAll, BsCheck } from "react-icons/bs";

const style = {
  position: "relative",
  top: "3px",
  paddingRight: "5px",
  display: "inline-block",
  margin: "0",
};
const MessageCheckMarker = ({ seenTime, receivedTime, fontSize }) => {
  return (
    <span style={style}>
      {receivedTime ? (
        <BsCheckAll fontSize={fontSize} style={seenTime && { color: "green" }} />
      ) : (
        <BsCheck fontSize={fontSize} />
      )}
    </span>
  );
};

export default MessageCheckMarker;
