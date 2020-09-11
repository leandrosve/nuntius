import React from "react";
import "./assets/Chat.css";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import {connect} from "react-redux";
import NuntiusLogo from "../util/NuntiusLogo";

const ChatWelcome = ({name}) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      paddingTop="20%"
      justifyContent="center"
      flexGrow="1"
    >
      <Box
        display="flex"
        flexWrap="1"     
        flexDirection="column"
        alignItems="center"
        
      >
        <NuntiusLogo style={{ width: "200px", height: "200px" }} />
        <Box display="flex" flexDirection="row" css={{ maxWidth: "400px" }}>
          <div>
            <EmojiPeopleIcon style={{ width: "100px", height: "100px" }} />
          </div>
          <div>
            <Typography variant="h5">{t("welcome_message", { name: toTitleCase(name) })}</Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const mapStateToProps = ({session}) =>{ 
    return {
        name:session.currentUser.name
    }
  }

  export default connect(mapStateToProps)(ChatWelcome);
  