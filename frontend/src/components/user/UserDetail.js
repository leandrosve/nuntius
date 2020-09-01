import React, { useState, useCallback } from "react";
import DeleteContactButton from "../contacts/DeleteContactButton";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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
import Username from "./Username";
import useAvatar from "../profile/useAvatar";
import Avatar from "../util/Avatar";

const UserDetail = ({
  editContact,
  addContact,
  deleteContact,
  id, username, alias, biography, contactId, name
}) => {
  const [openAliasForm, setOpenAliasForm] = useState(false);
  const handleToggleAliasForm = useCallback(() => {
    setOpenAliasForm((prev) => !prev);
  }, []);

  const avatar = useAvatar({userId:id});


  const renderAliasForm = () =>{
    if(contactId){
      return(
      openAliasForm ? (
        <AliasForm
          alias={alias}
          contactId={contactId}
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
              src={avatar}
              style={{ width: "125px", height: "125px", marginBottom: "auto" }}
              alt={alias ? alias : username}
            />          
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
              {<Username variant="overline" fontSize={!alias ? "20px" : null}>{username}</Username>}
              <Typography variant="subtitle1">{name}</Typography>
              {biography && (
                <Typography variant="overline">
                  <AcUnitIcon
                    fontSize="small"
                    style={{ marginBottom: "-3px" }}
                  />
                  {biography}
                </Typography>
              )}
              <div>
                <Box display="flex" justifyContent="flex-end">
                  <label>
                  <StartChatButton userId={id}/>
                  </label>
                {!contactId ? 
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
                    <DeleteContactButton contactUserId={id}/>
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

const AliasForm = ({ alias, contactId, handleToggleAliasForm, editContact }) => {
  const { t } = useTranslation();
  const [newAlias, setNewAlias] = React.useState(alias);
  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          if (newAlias !== alias) editContact({ contactId: contactId, alias: newAlias });
          handleToggleAliasForm();
          e.preventDefault();
        }}
      >
        <div style={{display:"flex", alignItems:"center"}}>
        <TextField
          label={t("alias")}
          value={newAlias}
          style={{flex:"1"}}
          autoFocus
          onChange={(e) => setNewAlias(e.target.value)}
        />
        <div>
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
            component="button"
            onClick={() => handleToggleAliasForm()}
          >
            <ClearIcon />
          </IconButton>
        </label>
        </div>
        </div>
      </form>
    </React.Fragment>
  );
};

UserDetail.propTypes = {
  id: PropTypes.number.isRequired,
  editContact: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
};

export default UserDetail;
