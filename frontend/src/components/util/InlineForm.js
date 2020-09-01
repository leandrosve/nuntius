import React, { useState, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import PropTypes from "prop-types";

const InlineForm = ({ fieldName, defaultValue="", handleSubmit ,variant}) => {
  const [newValue, setNewValue] = React.useState(defaultValue);
  const [openForm, setOpenForm] = useState(false);
  const handleToggleForm = useCallback(() => {
    setOpenForm((prev) => !prev);
  }, []);
  return (
    <React.Fragment>
      {!openForm ? (
        <div style={{ display: "flex", alignContent: "baseline" }}>
          <div>
          <Typography display="inline" variant={variant}>
            {defaultValue}
          </Typography>
          </div>       
            <IconButton
              aria-label="open"
              component="span"
              size="small"
              onClick={() => handleToggleForm()}
            >
              <EditIcon />
            </IconButton>
          </div>
      ) : (
        <form
          onSubmit={(e) => {
            if (newValue) handleSubmit(newValue);
            handleToggleForm();
            e.preventDefault();
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label={fieldName}             
              value={newValue}
              style={{ flex: "1" }}
              autoFocus
              onChange={(e) => setNewValue(e.target.value)}
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
                  onClick={() => handleToggleForm()}
                >
                  <ClearIcon />
                </IconButton>
              </label>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

InlineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default InlineForm;
