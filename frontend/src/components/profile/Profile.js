import React, { useState, useRef } from "react";
import TitledContainer from "../util/TitledContainer";

import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import Button from "@material-ui/core/Button";
import AvatarEditor from "react-avatar-editor";
import InputAdornment from "@material-ui/core/InputAdornment";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Slider from "@material-ui/core/Slider";
import Grid from '@material-ui/core/Grid';
import Alert from '../util/Alert';
import Typography from "@material-ui/core/Typography";
import { Spring } from "react-spring/renderprops";

const ImageEditor = ({ image, handleCancel, editorRef , handleAccept}) => {

  const [zoom, setZoom] = React.useState(1);

  const handleChange = (event, newValue) => {
    setZoom(newValue);
  };

  const { t } = useTranslation();

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1}} duration="2500">
      {(props) => (
        <div style={props}>
          <Typography style={{ margin: "5px" }} variant="h5">
            {t('image_adjust')}
          </Typography>
          <AvatarEditor
          style={{background:'black'}}
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
              color='secondary'
              max={3}
                value={zoom}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <ZoomInIcon/>
            </Grid>
          </Grid>
          <div>
            <Button variant="outlined" component="label" onClick={handleCancel}>
              {t('confirmation:cancel')}
            </Button>
            <Button variant="outlined" component="label" onClick={handleAccept}>
            {t('confirmation:accept')}
            </Button>
          </div>
        </div>
      )}
    </Spring>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const [uneditedImage, setUneditedImage] = useState();
  const [editedImage, setEditedImage] = useState();
  const editorRef = useRef();
  const [openSuccessAlert, setOpenSuccesAlert] = useState(false);

  const getEditedImage = () =>{
    setEditedImage(editorRef.current.getImage().toDataURL('image/png'));
    setUneditedImage(null);
  }
  
  return (
    <TitledContainer
      title={t("profile")}
      actions={<Button onClick={()=>setOpenSuccesAlert(true)}>{t("save")}</Button>}
      fixedContent={
       <Alert
        severity='success'
        open={openSuccessAlert}
        onClick={()=>setOpenSuccesAlert(false)}
       > 
         {t('success:saved')}
       </Alert>
       
      }
    >
      <Container maxWidth="xs">
        <TextField
          label={t("name")}
          name="name"
          type="text"
          size="small"
          variant="outlined"
          margin="normal"
          value="Juan perez"
          fullWidth
          id="name"
        />
        <div
          style={{
            textAlign: "center",
            position: "relative",
            margin: "auto",
          }}
        >
          {uneditedImage ? (
            <ImageEditor
              handleCancel={() => setUneditedImage(null)}
              image={uneditedImage}
              editorRef={editorRef}
              handleAccept={getEditedImage}            
            />
          ) : (
            <img
              alt="juan perez"
              src={editedImage || profilePicPlaceholder}
              style={{ borderRadius: "50%", width: "250px", height: "250px" }}
            />
          )}

          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            <Button variant="contained" component="label">
              <CameraAltIcon />
              <input
                type="file"
                accept="image/*"
                val={editedImage}
                style={{ display: "none" }}
                onChange={(e) => {
                  setUneditedImage(URL.createObjectURL(e.target.files[0]));
                }}
              ></input>
            </Button>
          </div>
        </div>

        <TextField
          label={t("info")}
          name="info"
          size="small"
          type="text"
          variant="outlined"
          margin="normal"
          value="mirando a la nada, pensando en todo..."
          fullWidth
          id="info"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AcUnitIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label={t("username")}
          name="username"
          value="juan perez"
          disabled
          size="small"
        />

        <TextField
          label={t("email")}
          name="email"
          size="small"
          type="text"
          variant="outlined"
          margin="normal"
          value="juanperez@gmail.com"
          disabled
          fullWidth
          id="email"
        />
      </Container>
    </TitledContainer>
  );
};

export default Profile;
