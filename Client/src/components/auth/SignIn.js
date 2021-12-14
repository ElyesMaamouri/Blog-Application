import React, { useState, useEffect, useHistory } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./signin.css";

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
      marginTop: 25,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 50,
      paddingLeft: 50,
    },
  },
});

const SignIn = (operation) => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => {
    return state.auth.loginInfo;
  });
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);

  // Position Snackbar
  const vertical = "top";
  const horizontal = "right";

  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    if (loginInfo === "Invalid email or password") {
      setMessage("error");
      return loginInfo;
    }
    if (loginInfo === "please activate your account") {
      setMessage("warning");
      return loginInfo;
    }
    if (loginInfo === "Successful authentication") {
      setTimeout(() => {
        operation.client.history.push("/");
      }, 4000);
      setMessage("success");
      return loginInfo;
    }
  }, [loginInfo]);

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
  };
  const handelSbmit = (e) => {
    e.preventDefault();
    dispatch(signIn(user));
    setOpen(true);
  };

  return (
    <div>
      <form
        className="signin"
        noValidate
        autoComplete="off"
        onSubmit={handelSbmit}
      >
        <h1>Sigin</h1>
        <TextField
          className={classes.filed}
          onChange={handelChange}
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
          onChange={handelChange}
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
        <div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            type="submit"
            color="success"
            disabled={!user.email || user.password.length < 8}
          >
            Signin
          </Button>
        </div>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={message} sx={{ width: "100%" }}>
          {loginInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
