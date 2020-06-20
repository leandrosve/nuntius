import React, { useEffect, useCallback } from "react";
import "./Util.css";
import { BsX } from "react-icons/bs";
import CloseIcon from "@material-ui/icons/Close";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Modal = (props) => {
  const handleClickAway = () => {
    props.handleClose();
  };
  return (
    <div className="Modal-back">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="Modal">
          {props.children}

          <button class="Modal-dismissButton" onClick={props.handleClose}>
            <CloseIcon />
          </button>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Modal;
