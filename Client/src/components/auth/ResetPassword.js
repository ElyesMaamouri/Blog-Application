import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams } from "react-router-dom";

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

const ResetPassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const resetPasswordInfo = useSelector((state) => {
    return state.auth.resetPasswordInfo;
  });
  const [userNewPassword, setUserNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [validForm, setValidForm] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  let { token } = useParams();
  console.log("token", token);
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Position Snackbar
  const vertical = "top";
  const horizontal = "right";
  let dateNow = new Date();

  useEffect(() => {
    if (resetPasswordInfo === "User not found or Token expired ..") {
      setMessage("error");
    } else if (
      resetPasswordInfo === "Your password has been changed successfully"
    ) {
      setMessage("success");
    }
  }, [resetPasswordInfo]);

  const handelChange = (e) => {
    setUserNewPassword({ ...userNewPassword, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      if (e.target.value === "" || e.target.value.length < 8) {
        setPasswordError(true);
      }

      if (
        e.target.value !== userNewPassword.confirmPassword &&
        e.target.value !== userNewPassword.confirmPassword.length
      ) {
        setPasswordError(true);
        setConfirmPasswordError(true);
        setValidForm(false);
      } else {
        setPasswordError(false);
        setConfirmPasswordError(false);
        setValidForm(true);
      }
    }

    if (e.target.name === "confirmPassword") {
      if (
        e.target.value === userNewPassword.password &&
        e.target.value.length === userNewPassword.password.length
      ) {
        console.log("here test again");
        setConfirmPasswordError(false);
        setPasswordError(false);
        setValidForm(true);
      } else {
        setConfirmPasswordError(true);

        setValidForm(false);
      }
    }
  };

  const handelSbmit = (e) => {
    e.preventDefault();
    const data = {
      password: userNewPassword.password,
      resetPasswordToken: token,
    };
    dispatch(resetPassword(data));
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
        <h1>Recover Password</h1>
        <TextField
          className={classes.filed}
          onChange={handelChange}
          size="medium"
          label="Password"
          name="password"
          variant="outlined"
          required
          type="text"
          placeholder="Enter new password"
          error={passwordError}
          helperText={passwordError ? "Those passwords didn’t match " : ""}
        />
        <TextField
          className={classes.filed}
          onChange={handelChange}
          label="Confirm password "
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
        <div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            type="submit"
            color="success"
            disabled={!validForm}
          >
            Signup
          </Button>
        </div>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={message} sx={{ width: "100%" }}>
          {resetPasswordInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
