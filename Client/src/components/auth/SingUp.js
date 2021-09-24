import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { signUp } from "../store/actions/authActions";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  btn: {
    "&.MuiButton-root:hover": {
      fontSize: 50,
      backgroundColor: "violet",
      cursor: "pointer",
    },
  },
  filed: {
    "&.MuiFormControl-root": {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
  },
});

const SignUp = () => {
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
    if (registerInfo) {
      return registerInfo;
    }
  }, [registerInfo]);

  const handelSbmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("password", user.password);
    formData.append("userName", user.userName);
    formData.append("email", user.email);

    // Send all values inputs to api
    dispatch(signUp(formData));
  };

  const handelInputs = (e) => {
    handleChangeFile(e);
    handleChange(e);
  };
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handelSbmit}>
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Name"
          name="userName"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={userNameError}
          helperText={
            userNameError ? "Account name must be at least 3 characters " : ""
          }
        />
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Email"
          name="email"
          variant="outlined"
          color="secondary"
          required
          placeholder="email@eamil.com"
          fullWidth
          error={emailError}
          helperText={emailError ? "Invalid format email" : ""}
        />
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Password"
          name="password"
          variant="outlined"
          color="secondary"
          required
          placeholder="Enter password"
          fullWidth
          error={passwordError}
          helperText={
            passwordError ? "Password should be minimum 8 characters long" : " "
          }
        />
        <TextField
          className={classes.filed}
          onChange={handleChange}
          label="Confirm password "
          name="confirmPassword"
          variant="outlined"
          color="secondary"
          required
          placeholder="Confirm password"
          fullWidth
          error={confirmPasswordError}
          helperText={
            confirmPasswordError ? "Those passwords didn’t match" : " "
          }
        />

        <TextField
          className={classes.filed}
          id="raised-button-file"
          name="avatar"
          type="file"
          onChange={handelInputs}
        />
        <Button
          type="submit"
          variant="outlined"
          disabled={
            !user.userName ||
            !user.email ||
            !user.password ||
            !user.confirmPassword ||
            !user.avatar
          }
        >
          Submit
        </Button>
      </form>
      {registerInfo}
    </div>
  );
};

export default SignUp;
