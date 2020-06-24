import React, { useState } from "react";
import TitledContainer from "./util/TitledContainer";

import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import AvatarEditor from "react-avatar-editor";
import InputAdornment from "@material-ui/core/InputAdornment";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Fab from '@material-ui/core/Fab'
import SettingsIcon from '@material-ui/icons/Settings';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <TitledContainer title={t("settings")} icon={<SettingsIcon/>} actions={<Button>Save</Button>}>
      <Container maxWidth="xs">
      <FormControl fullWidth>
        <InputLabel htmlFor="uncontrolled-native">{t('language')}</InputLabel>
        <NativeSelect
          defaultValue={30}
          
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option>ENG</option>
          <option>ES</option>

        </NativeSelect>
      </FormControl>
        
      </Container>
    </TitledContainer>
  );
};

export default Settings;
