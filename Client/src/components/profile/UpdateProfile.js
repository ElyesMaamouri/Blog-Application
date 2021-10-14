import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { updateProfile } from "../store/actions/authActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import logoUser from "../../assets/user.svg";
import decodeTokens from "../../helpers/decodeToken";
import "./updateProfile.css";

const useStyles = makeStyles({
  filed: {
    "&.MuiFormControl-root": {
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      width: 300,
    },
  },
  buttonSubmit: {
    "&.MuiButton-root": {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 50,
      paddingLeft: 50,
    },
  },
});

const UpdateProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateProfileInfo = useSelector(
    (state) => state.auth.updateProfileInfo
  );
  const [user, setUser] = useState({
    currentlyPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [currentlyPasswordError, setCurrentlyPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  const currentlyUser = decodeTokens(localStorage.getItem("userDetails"));
  console.log("currentlyUser", currentlyUser);
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Position Snackbar
  const vertical = "top";
  const horizontal = "right";

  //  Handel & test all inputs
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "currentlyPassword") {
      if (e.target.value === "" || e.target.value.length < 8) {
        setCurrentlyPasswordError(true);
      } else {
        setCurrentlyPasswordError(false);
      }
    }
    if (e.target.name === "newPassword") {
      if (e.target.value === "" || e.target.value.length < 8) {
        setNewPasswordError(true);
      } else {
        setNewPasswordError(false);
      }
    }
    if (e.target.name === "confirmPassword") {
      if (
        e.target.value === user.newPassword &&
        e.target.value.length === user.newPassword.length
      ) {
        setConfirmPasswordError(false);
      } else {
        setConfirmPasswordError(true);
      }
    }
  };

  useEffect(() => {
    if (updateProfileInfo === "Your account has been successfully updated") {
      setMessage("success");
      return updateProfileInfo;
    } else if (updateProfileInfo === "User not found") {
      setMessage("warning");
      return updateProfileInfo;
    } else if (updateProfileInfo === "Invalid currently password") {
      setMessage("warning");
      return updateProfileInfo;
    }
  }, [updateProfileInfo]);
  console.log("updateProfileInfo", updateProfileInfo);
  const handelSbmit = (e) => {
    e.preventDefault();
    const updateUser = {
      userName: currentlyUser.name,
      email: currentlyUser.email,
      currentlyPassword: user.currentlyPassword,
      newPassword: user.newPassword,
    };
    setOpen(true);
    // Send all values inputs to api
    dispatch(updateProfile(updateUser));
  };

  return (
    <div className="updateAccount">
      <div className="left_side_update_account  ">
        <form noValidate autoComplete="off" onSubmit={handelSbmit}>
          <div className="updateProfil">
            <h2>Update Your Account </h2>
            <img className="user" src={logoUser} />

            <TextField
              className={classes.filed}
              onChange={handleChange}
              label="Name"
              size="medium"
              name="userName"
              value={currentlyUser.name || ""}
              disabled
              variant="outlined"
              required
            />
            <TextField
              className={classes.filed}
              onChange={handleChange}
              size="medium"
              label="Email"
              name="email"
              value={currentlyUser.email || ""}
              disabled
              variant="outlined"
              required
              placeholder="email@eamil.com"
            />
            <TextField
              className={classes.filed}
              onChange={handleChange}
              size="medium"
              label="Currently Password"
              name="currentlyPassword"
              variant="outlined"
              required
              type="text"
              placeholder="Enter password"
              error={currentlyPasswordError}
              helperText={
                currentlyPasswordError
                  ? "Password should be minimum 8 characters"
                  : ""
              }
            />
            <TextField
              className={classes.filed}
              onChange={handleChange}
              size="medium"
              label="New Password"
              name="newPassword"
              variant="outlined"
              required
              type="text"
              placeholder="Enter password"
              error={newPasswordError}
              helperText={
                newPasswordError
                  ? "Password should be minimum 8 characters"
                  : ""
              }
            />
            <TextField
              className={classes.filed}
              onChange={handleChange}
              label="Confirm new password "
              size="medium"
              name="confirmPassword"
              variant="outlined"
              required
              type="text"
              placeholder="Confirm password"
              error={confirmPasswordError}
              helperText={
                confirmPasswordError ? "Those passwords didn’t match" : ""
              }
            />

            <Button
              className={classes.buttonSubmit}
              variant="contained"
              type="submit"
              color="success"
              disabled={
                !user.currentlyPassword ||
                !user.newPassword ||
                !user.confirmPassword
              }
            >
              Signup
            </Button>
          </div>
        </form>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity={message} sx={{ width: "100%" }}>
            {updateProfileInfo}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default UpdateProfile;
