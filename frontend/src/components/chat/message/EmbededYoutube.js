import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    embeded: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    thumbnailContainer: {
        position: "relative",
        "&:hover $thumbnail": { opacity: "0.8" },
        width: "100%",
        height: "calc(width * 1.333)",
      },
      thumbnail: {
        width: "100%",
        height: "auto",
        position: "relative",
        zIndex: "50",
      },
      thumbnailButton: {
        position: "absolute",
        zIndex: "55",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    }));

const EmbededYoutube = ({ text, handleOpenVideoPlayer }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const regex = /(?:(?:https?:)?\/\/)?(?:www\.)?youtu(?:be\.com\/(?:watch\?(?:.*?&(?:amp;)?)*v=|v\/|embed\/)|\.be\/)([\w‌​]+)(?:(?:&(?:amp;)?|\?)[\w=]*)*/g;
    var matches = regex.exec(text);
    const handleClick = () => {
      handleOpenVideoPlayer("https://www.youtube.com/embed/" + matches[1] + "?autoplay=1");
    };
  
    if (matches !== null) {
      return (
        <div className={classes.thumbnailContainer} onClick={handleClick}>
          <Button
            startIcon={<YouTubeIcon />}
            className={classes.thumbnailButton}
            variant="contained"
            color="secondary"
          >
            {t("watch")}
          </Button>
          <img
            src={`https://img.youtube.com/vi/${matches[1]}/0.jpg`}
            alt="youtube video"
            className={classes.thumbnail}
          />
        </div>
      );
    } else {
      return null;
    }
  };
  export default EmbededYoutube;