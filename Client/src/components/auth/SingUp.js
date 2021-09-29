import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { signUp } from "../store/actions/authActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import "./singup.css";

const useStyles = makeStyles({
  filed: {
    "&.MuiFormControl-root": {
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      width: 400,
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

const SignUp = (operation) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const registerInfo = useSelector((state) => state.auth.registerInfo);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);

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

    if (e.target.name === "userName") {
      const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (regex.test(e.target.value) === false && e.target.value.length >= 3) {
        setUserNameError(false);
      } else {
        setUserNameError(true);
      }
    }
    if (e.target.name === "email") {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (regex.test(String(e.target.value).toLowerCase())) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
    if (e.target.name === "password") {
      if (e.target.value === "" || e.target.value.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    if (e.target.name === "confirmPassword") {
      if (
        e.target.value === user.password &&
        e.target.value.length === user.password.length
      ) {
        setConfirmPasswordError(false);
      } else {
        setConfirmPasswordError(true);
      }
    }
  };

  // handel input file
  const handleChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (registerInfo === "Your account has been successfully created") {
      setMessage("success");
      setTimeout(() => {
        operation.client.history.push("/signin");
      }, 4000);
      return registerInfo;
    } else if (registerInfo === "Sorry! email already exists") {
      setMessage("warning");
      console.log("messs", message);
      return registerInfo;
    }
  }, [registerInfo]);

  const handelSbmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileUpload", selectedFile);
    formData.append("password", user.password);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    setOpen(true);
    // Send all values inputs to api

    dispatch(signUp(formData));
  };

  const handelInputs = (e) => {
    handleChangeFile(e);
    handleChange(e);
  };

  return (
    <div>
      <form
        className="signup"
        noValidate
        autoComplete="off"
        onSubmit={handelSbmit}
      >
        <h1>Signup </h1>
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Name"
          size="medium"
          name="userName"
          variant="outlined"
          required
          error={userNameError}
          helperText={
            userNameError ? "Account name must be at least 3 characters" : ""
          }
        />
        <TextField
          className={classes.filed}
          onChange={handleChange}
          size="medium"
          label="Email"
          name="email"
          variant="outlined"
          required
          placeholder="email@eamil.com"
          error={emailError}
          helperText={emailError ? "Invalid format email" : ""}
        />

        <TextField
          className={classes.filed}
          onChange={handleChange}
          size="medium"
          label="Password"
          name="password"
          variant="outlined"
          required
          type="password"
          placeholder="Enter password"
          error={passwordError}
          helperText={
            passwordError ? "Password should be minimum 8 characters" : ""
          }
        />
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Confirm password "
          size="medium"
          name="confirmPassword"
          variant="outlined"
          required
          type="password"
          placeholder="Confirm password"
          error={confirmPasswordError}
          helperText={
            confirmPasswordError ? "Those passwords didn’t match" : ""
          }
        />
        <TextField
          className={classes.filed}
          name="avatar"
          type="file"
          onChange={handelInputs}
        ></TextField>
        {/* <TextField
              className={classes.filedFile}
              name="avatar"
              type="file"
              onChange={handelInputs}
            /> */}

        <div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            type="submit"
            color="success"
            disabled={
              !user.userName ||
              !user.email ||
              !user.password ||
              !user.confirmPassword ||
              !user.avatar
            }
          >
            Signup
          </Button>
        </div>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={message} sx={{ width: "100%" }}>
          {registerInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
