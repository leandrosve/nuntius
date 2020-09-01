import React from "react";
import { default as MaterialAvatar } from "@material-ui/core/Avatar";
import PropTypes from "prop-types";

const colors = [
  "#726a95",
  "#3709fb",
  "#faac34",
  "#ffc93c",
  "#40a8c4",
  "#3fd8b3",
  "#9feb72",
  "#e11d74",
  "#ed6663",
  "#05dfd7",
  "#c81912",
];

const getColor = function (string) {
  if(!string) return null;  
  var hash = 0,
    length = string.length,
    i = 0;
  if (length > 0)
    while (i < length) hash = ((hash << 5) - hash + string.charCodeAt(i++)) | 0;
  hash = hash < 0 ? -hash : hash;
  const index = hash % 10;
  return colors[index];
};

const Avatar = (props) => {
 const {group, children, ...params} = props;
  return (
    <MaterialAvatar
      {...params}
      style={{ ...props.style, backgroundColor: !props.src  ? getColor(props.alt) : null }}
    >
      {props.alt ? props.alt.charAt(0).toUpperCase() : null}
      {children}
    </MaterialAvatar>
  );
};
Avatar.propTypes = {
  ...MaterialAvatar.propTypes,
  group: PropTypes.any,
};
export default Avatar;
