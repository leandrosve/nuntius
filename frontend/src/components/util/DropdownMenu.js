import React from "react";
import "../../App.css";
import { useTranslation } from "react-i18next";

export const DropdownItem = (props) => {

  return (
    <a href="#" className="DropdownMenu-item" onClick={props.onClick}>
      <span className="icon-button">{props.icon}</span>
      {props.text}
    </a>
  );
};

function DropdownMenu(props) {
  return (
    <div className="DropdownMenu">
      <ul>{props.children}</ul>
    </div>
  );
}

export default DropdownMenu;
