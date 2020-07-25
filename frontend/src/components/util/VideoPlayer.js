import React from "react";
import Box from "@material-ui/core/Box";
import { Spring } from "react-spring/renderprops";
import Button from "@material-ui/core/Button";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    background: "white",
    position: "absolute",
    top: "0",
    zIndex: theme.zIndex.speedDial,
    left: "50%",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: theme.shadows[3],
    transform: "translateX(-50%)",
  },
  
}));

const VideoPlayer = ({ children, handleClose }) => {
    const classes = useStyles();
    return (
      <Spring
        from={{ opacity: 0.5, height: "0px" }}
        to={{ opacity: 1, height: "305px" }}
        duration={2500}
      >
        {(props) => (
          <Box
            display="flex"
            flexDirection="column"
            style={props}
            className={classes.videoPlayer}
          >
            {children}
            <Button onClick={handleClose} style={{ width: "100%" }}>
              <ExpandLessIcon />
            </Button>
          </Box>
        )}
      </Spring>
    );
  };

  export default VideoPlayer;