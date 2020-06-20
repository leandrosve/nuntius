import React from "react";
import "./Util.css";

export const DropdownItem = (props) => {
  return (
    <li className="DropdownMenu-item" style={{cursor:"pointer"}} onClick={props.onClick}>   
        <span className="icon-button" style={{textAlign:"center"}}>{props.icon}</span>
        {props.text}
    </li>
  );
};

function DropdownMenu(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="DropdownMenu">
      <ul style={{display:"inline-block", width:"100%"}}>{props.children}</ul>
    </div>
  );
}

export default DropdownMenu;
