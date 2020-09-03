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

const getColorFromNumber = (number) =>{
  return number ? colors[number % 10] : colors[0]
}

const Avatar = (props) => {
 const {group, children, ...params} = props;
  return (
    <MaterialAvatar
      {...params}
      style={{ ...props.style, backgroundColor: (!props.src || props.src === "not found") ? getColorFromNumber(props.colorSource) : null }}
    >
      {props.alt ? props.alt.charAt(0).toUpperCase() : null}
      {children}
    </MaterialAvatar>
  );
};
Avatar.propTypes = {
  ...MaterialAvatar.propTypes,
  group: PropTypes.any,
  colorSource: PropTypes.number
};
export default Avatar;
