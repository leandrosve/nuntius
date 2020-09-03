import React from "react";

import { useTranslation } from "react-i18next";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import Button from "@material-ui/core/Button";
import AvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Spring } from "react-spring/renderprops";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root:{
    textAlign:"center",
  }
}));

const ImageEditor = ({ image, handleCancel, editorRef, handleAccept }) => {
  const [zoom, setZoom] = React.useState(1);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setZoom(newValue);
  };

  const { t } = useTranslation();
 
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} duration="2500">
      {(props) => (
        <div style={props} className={classes.root}>
          <Typography style={{ margin: "5px" }} variant="h5">
            {t("image_adjust")}
          </Typography>
          <AvatarEditor
            style={{ background: "black" }}
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            borderRadius={125}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={zoom}
            rotate={0}
          />
          <Grid container spacing={2}>
            <Grid item>
              <ZoomOutIcon />
            </Grid>
            <Grid item xs>
              <Slider
                min={1}
                step={0.05}
                color="secondary"
                max={3}
                value={zoom}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <ZoomInIcon />
            </Grid>
          </Grid>
          <div>
            <Button variant="outlined" component="label" onClick={handleCancel}>
              {t("confirmation:cancel")}
            </Button>
            <Button variant="outlined" component="label" onClick={handleAccept}>
              {t("confirmation:accept")}
            </Button>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default ImageEditor;
