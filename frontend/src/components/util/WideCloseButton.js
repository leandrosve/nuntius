import React from "react";
import Button from "@material-ui/core/Button";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const WideCloseButton = ({ onClick }) => {
  return (
    <Button
      style={{ width: "100%", marginTop: "10px" }}
      color="primary"
      size="large"
      aria-label="close"
      onClick={onClick}
    >
      <ExpandLessIcon />
    </Button>
  );
};

export default WideCloseButton;
