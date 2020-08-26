import React from "react";
import { Chip } from "@material-ui/core";
import moment from "moment";
import "moment/locale/es";
import { useTranslation } from "react-i18next";

const DateMarker = ({ date }) => {

  const { t } = useTranslation();

  const displayDate = ()=>{
    const momentDate = moment(date)
    const momentCompare = moment(new Date());
    return momentDate.isSame(momentCompare, 'day') ? t("date:today") :
      momentDate.isSame(momentCompare.subtract(1, 'day'),'day') ?  t("date:yesterday") : 
      momentDate.format('LL'); 
  }
  return (
    <div
      style={{
        textAlignLast: "center",
        width: "auto",
        margin: "10px",
      }}
    >
      <Chip label={displayDate()} />
    </div>
  );
};
export default React.memo(DateMarker);
