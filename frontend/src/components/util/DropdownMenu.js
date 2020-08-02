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

  return (
    <div className="DropdownMenu" {...props}>
      <ul style={{display:"inline-block", width:"100%"}}>{props.children}</ul>
    </div>
  );
}

export default DropdownMenu;
