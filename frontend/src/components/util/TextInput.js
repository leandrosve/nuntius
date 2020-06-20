
import React from "react";
import { useField } from "formik";

import TextField from '@material-ui/core/TextField'
const TextInput = ({ ...props }) => {
  
  const [field, meta] = useField(props);
  return (
    <>
      <TextField {...props} {...field}/>
        <div className="error">
          {meta.touched && meta.error && meta.error !== 'r' ? meta.error : null}</div>
    
    </>
  );
};

export default TextInput;
