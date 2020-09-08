import React, { useState, useRef, useCallback , useEffect} from "react";
import TitledContainer from "../util/TitledContainer";

import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Alert from '../util/Alert';
import ImageEditor from "../util/ImageEditor";
import  Avatar  from "../util/Avatar"
import useAvatar from "../util/hooks/useAvatar";
import SmartAlert from "../util/SmartAlert";
import { EDIT_PROFILE_REQUEST } from "../../redux/user/userActionTypes";

const alertConcerns = [EDIT_PROFILE_REQUEST];

const Profile = ({username, name, email, biography, id , handleSave}) => {
  const { t } = useTranslation();

  let originalImage = useAvatar({userId:id});

  const [uneditedImage, setUneditedImage] = useState();
  const [editedImage, setEditedImage] = useState();
  const editorRef = useRef();

  const getEditedImage = () =>{
    const image = editorRef.current.getImage().toDataURL('image/png');
    setEditedImage(image);
    setUneditedImage(null);
  }

  const [newInfo, setNewInfo] = useState({name:name, biography:biography});

  const [showSaveButton, setShowSaveButton]= useState(false);

  useEffect(() =>{
    setShowSaveButton(
      newInfo.name !== "" && (!!editedImage || newInfo.name !== name || 
        (!biography  ? newInfo.biography && newInfo.biography !=="" : newInfo.biography !== biography)));
  },[newInfo, name, biography, editedImage])

  const handleChangeName = useCallback((e)=>{
    setNewInfo({...newInfo, name:e.target.value});
  },[setNewInfo, newInfo])

  const handleChangeBiography = useCallback((e)=>{
    setNewInfo({...newInfo, biography:e.target.value});
  },[setNewInfo, newInfo])

  const save = useCallback(()=>{
    handleSave(newInfo.name, newInfo.biography, editedImage)
    setEditedImage(null);;
  },[handleSave, newInfo, editedImage, setEditedImage]);
  
  return (
    <TitledContainer
      title={t("profile")}
      actions={showSaveButton && <Button onClick={()=>save()}>{t("save")}</Button>}
      fixedContent={
       <SmartAlert concerns={alertConcerns}/>
      }
    >
      <Container maxWidth="xs">
        <TextField
          label={t("name")}
          name="name"
          type="text"
          size="small"
          required
          variant="outlined"
          margin="normal"
          defaultValue={name}
          onChange={handleChangeName}
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
            
            <Avatar
              alt={name}
              src={editedImage ||  originalImage}
              colorSource={id}
              style={{ borderRadius: "50%", width: "250px", height: "250px", margin:"auto" }}
            />
          )}         
          <div style={{ display:"flex",  justifyContent:"space-between", flexDirection:"row-reverse"}}>        
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
            {editedImage && (editedImage !== originalImage) && <Button variant="contained" onClick={()=>{setEditedImage(null)}}>{t("undo")}</Button>}
          </div>
        </div>

        <TextField
          label={t("bio")}
          name="info"
          size="small"
          type="text"
          variant="outlined"
          margin="normal"
          defaultValue={biography}
          fullWidth
          onChange={handleChangeBiography}
          id="bio"
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
          value={username}
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
          value={email}
          disabled
          fullWidth
          id="email"
        />
      </Container>
    </TitledContainer>
  );
};

export default Profile;
