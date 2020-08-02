import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import { Spring } from "react-spring/renderprops";
import { connect } from "react-redux";
import { searchUsers } from "../../redux/user/userActions";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddContact = ({ searchUsers, users , handleUserSearchClick}) => {
  const { t } = useTranslation();

  const handleOnChange = (e) => {
    const input = e.target.value;
    if (input.length >= 3 && !input.startsWith(searchParam)) {
      setSearchParam(input);
      searchUsers(input);
    }
  };

  const [searchParam, setSearchParam] = React.useState(" ");

  return (
    <Spring
      from={{ opacity: 0, height: "0px" }}
      to={{ opacity: 1, height: "77px" }}
      duration={2500}
    >
      {(props) => (
        <div style={props}>
          <Typography style={{ margin: "5px" }} variant="h5">
            {t("contact_add")}
          </Typography>

          <Autocomplete
            id="combo-box-demo"
            options={users}
            freeSolo
            getOptionLabel={(user) => `${user.name} - @${user.username}`}
            onChange={(e, value)=>{handleUserSearchClick(value);e.stopPropagation();}}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                autoFocus="true"
                placeholder={t("search_username")}
                fullWidth
                onChange={handleOnChange}
                InputProps={{
                  ...params.InputProps,

                  className: {},
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            )}
          />
        </div>
      )}
    </Spring>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (someString) => dispatch(searchUsers(someString)),
  };
};

const mapStateToProps = ({ user }) => {
  return {
    users: user.search,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
