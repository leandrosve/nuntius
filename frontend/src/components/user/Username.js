import React from "react";
import Typography from "@material-ui/core/Typography";

const Username = ({ children, variant="overline", fontSize}) => (
  <Typography gutterbottom="true"  variant={variant}>
    <p style={{ lineHeight: 1, margin: "0px 2px", fontSize: fontSize}}>@{children}</p>
  </Typography>
);

export default Username;
