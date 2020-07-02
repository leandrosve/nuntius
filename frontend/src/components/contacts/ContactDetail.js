import React, {useState, useCallback} from "react";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { Spring } from "react-spring/renderprops";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AcUnitIcon from "@material-ui/icons/AcUnit";
import {Link}from "react-router-dom";


import { useTranslation } from "react-i18next";


const ContactDetail = ({handleStartChat}) => {
    const {t} = useTranslation();
    const [openAliasForm, setOpenAliasForm] = useState(false);
    const alias='Don Ramon';
    const handleToggleAliasForm = useCallback(
        () => {   
            setOpenAliasForm((prev) => !prev);
        },[],);
    
    return(
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2500}>
      {(props) => (
        <div style={(props.style, {paddingTop:'10px'})}>
         < Box display='flex' flexDirection='row' alignItems='center' maxWidth='400px'>
         <Avatar src={profilePicPlaceholder} style={{width:'125px', height:'125px', marginBottom:'auto'}}/>
         <Box display='flex' flexDirection='column' style={{ marginLeft:'10px'}}>
           <Box display='flex' flexDirection='row' alignItems='center' flexGrow='1' flexShrink='1' >
            {openAliasForm ?
                <React.Fragment>
                <TextField label={t('alias')} defaultValue={alias} autoFocus />
                <label>
                    <IconButton size='small' aria-label="submit" 
                                component="span" onClick={()=>handleToggleAliasForm()} 
                    > 
                        <DoneIcon/>
                    </IconButton> 
                </label>
                <label>
                    <IconButton size='small' aria-label="cancel" 
                                component="span" onClick={()=>handleToggleAliasForm()}> <ClearIcon/></IconButton> 
                </label>
                </React.Fragment>
            :
                <React.Fragment>
                <Typography display='inline'  variant="h5">                  
                    {alias}
                </Typography>
                <label>
                    <IconButton size='small' aria-label="open" 
                                component="span" onClick={()=>handleToggleAliasForm()}><EditIcon/></IconButton> 
                </label>
                </React.Fragment>
            }
          </Box >
          <Typography variant="subtitle1">         
            @donramon
          </Typography>
          <Typography  variant="subtitle1">         
            Don Ramon Cornelio del Rancho.
          </Typography>
          <Typography  variant="overline text">         
          <AcUnitIcon fontSize='small' style={{marginBottom:'-3px'}}/> Mirando a la nada pensando en todo ese es mi lema.
          </Typography>
          <div>
              <Box display='flex' justifyContent='flex-end'>
          <label>
          <IconButton           
                alt='start chat'
                aria-label="start chat"
                onClick={()=>handleStartChat()}
                component={Link} to={`/browse/chat/@donalfredo`}
              >
              <ChatIcon />
          </IconButton>
          </label>
          <label>
          <IconButton           
                alt='delete'
                aria-label="delete contact"
              
              >
              <DeleteOutlineIcon />
          </IconButton>
          </label>   
          </Box>    
          </div>
          </Box>
          </ Box>
        
        </div>
      )}
    </Spring>
    )
  };

  export default ContactDetail;