import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
  dateMarker: {
    background: "gray",
    padding: "0px 10px",
    boxShadow: theme.shadows[1],
    borderRadius: '10px',
  },
}));


const DateMarker = ({date}) => {
    const classes= useStyles();
    dateFormat.i18n = {
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
    };
    return (
      <div
        style={{
          textAlignLast: "center",
          width: "auto",
          margin: "10px",
        }}
      >
      
        <span className={classes.dateMarker}>
          {dateFormat(date, "longDate")}
        </span>
        
      </div>
    );
  };
export default React.memo(DateMarker);