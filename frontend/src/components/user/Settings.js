import React, { useState } from "react";
import TitledContainer from "../util/TitledContainer";

import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import i18n  from "i18next";
import Alert from "../util/Alert";

const Settings = () => {
  const { t } = useTranslation();

  const [newLanguage, setNewLanguage] = useState(i18n.language);

  const [openAlert, setOpenAlert] = useState(false);

  const handleSave = ()=>{
    i18n.changeLanguage(newLanguage);
    setOpenAlert(true);
  }

  return (
    <TitledContainer title={t("settings")} icon={<SettingsIcon/>} 
      actions={(newLanguage !== i18n.language) && <Button onClick={handleSave}>{t('save')}</Button>}>
      <Container maxWidth="xs">
       {<Alert open={openAlert} severity="success" onClick={()=>setOpenAlert(false)}>{t("success:saved")}</Alert>}
      <FormControl fullWidth>
        <InputLabel htmlFor="uncontrolled-native">{t('language')}</InputLabel>
        <NativeSelect
          defaultValue={i18n.language}
          onChange={(e)=>setNewLanguage(e.target.value)}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value="en">ENG</option>
          <option value="es">ES</option>

        </NativeSelect>
      </FormControl>
        
      </Container>
    </TitledContainer>
  );
};

export default Settings;
