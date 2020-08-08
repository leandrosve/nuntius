import React, { useState, useCallback } from "react";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import DeleteContactButton from "./DeleteContactButton";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { Spring } from "react-spring/renderprops";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AcUnitIcon from "@material-ui/icons/AcUnit";
            
import { useTranslation } from "react-i18next";

import PropTypes from 'prop-types';
import StartChatButton from "../chat/StartChatButton";

const ContactDetail = ({
  editContact,
  addContact,
  username,
  alias,
  biography,
  id,
  userId,
  name,
  isContact=true,
}) => {
  const [openAliasForm, setOpenAliasForm] = useState(false);
  const handleToggleAliasForm = useCallback(() => {
    setOpenAliasForm((prev) => !prev);
  }, []);

  const renderAliasForm = () =>{
    if(isContact){
      return(
      openAliasForm ? (
        <AliasForm
          alias={alias}
          id={id}
          editContact={editContact}
          handleToggleAliasForm={handleToggleAliasForm}
        />
      ) : (
        <React.Fragment>
          <Typography display="inline" variant="h5">
            {alias}
          </Typography>
          <label>
            <IconButton
              aria-label="open"
              component="span"
              size="small"
              onClick={() => handleToggleAliasForm()}
            >
              <EditIcon />
            </IconButton>
          </label>
        </React.Fragment>
      )
      );
    }
  }

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2500}>
      {(props) => (
        <div style={{ ...props, paddingTop: "10px" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            maxWidth="400px"
          >
            <Avatar
              src={profilePicPlaceholder}
              style={{ width: "125px", height: "125px", marginBottom: "auto" }}
            >
              {name}
            </Avatar>
            <Box
              display="flex"
              flexDirection="column"
              style={{ marginLeft: "10px", flexGrow: "1", flexShrink: "1" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                flexGrow="1"
                flexShrink="1"
              >
                
              {renderAliasForm()}
              </Box>
              <Typography gutterbottom="true" variant={isContact ? "overline" : "h6"} >
                <p style={{ lineHeight: 1, margin: "0px 2px"}}>@{username}</p>
              </Typography>
              <Typography variant="subtitle1">{name}</Typography>
              {biography && (
                <Typography variant="overline text">
                  <AcUnitIcon
                    fontSize="small"
                    style={{ marginBottom: "-3px" }}
                  />{" "}
                  {biography}
                </Typography>
              )}
              <div>
                <Box display="flex" justifyContent="flex-end">
                  <label>
                  <StartChatButton username={username}/>
                  </label>
                {!isContact ? 
                  <label>
                    <IconButton
                      alt="add"
                      aria-label="add contact"  
                      onClick={()=>addContact(id)}                  
                    >
                      <PersonAddIcon />
                    </IconButton>
                  </label>
                  :
                  <label>
                    <DeleteContactButton contact={{username:username, alias:alias, id:id, userId:userId, name:name}}/>
                  </label>
                }

                </Box>
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Spring>
  );
};

const AliasForm = ({ alias, id, handleToggleAliasForm, editContact }) => {
  const { t } = useTranslation();
  const [newAlias, setNewAlias] = React.useState(alias);
  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          if (newAlias !== alias) editContact({ id: id, alias: newAlias });
          handleToggleAliasForm();
          e.preventDefault();
        }}
      >
        <TextField
          label={t("alias")}
          value={newAlias}
          autoFocus
          onChange={(e) => setNewAlias(e.target.value)}
        />
        <label>
          <IconButton
            aria-label="submit"
            component="button"
            type="submit"
            size="small"
            value="Submit"
          >
            <DoneIcon />
          </IconButton>
        </label>
        <label>
          <IconButton
            aria-label="cancel"
            size="small"
            component="span"
            onClick={() => handleToggleAliasForm()}
          >
            <ClearIcon />
          </IconButton>
        </label>
      </form>
    </React.Fragment>
  );
};

ContactDetail.propTypes = {
  id: PropTypes.number.isRequired,
  editContact: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
};

export default ContactDetail;
