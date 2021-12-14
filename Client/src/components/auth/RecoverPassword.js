import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../store/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const RecoverPassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const recoverPasswordInfo = useSelector((state) => {
    return state.auth.recoverPasswordInfo;
  });
  console.log("recover compoenent", recoverPasswordInfo);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  const [validForm, setValidForm] = useState();
  // Position Snackbar
  const vertical = "top";
  const horizontal = "right";
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    if (
      recoverPasswordInfo ===
      "The email address is not associated with any account."
    ) {
      setMessage("error");
    } else if (
      recoverPasswordInfo ===
      "Password reset instructions will be sent to this email"
    ) {
      setMessage("success");
    }
  }, [recoverPasswordInfo]);

  const handelChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (regex.test(String(e.target.value).toLowerCase())) {
        setEmailError(false);
        setValidForm(true);
      } else {
        setEmailError(true);
        setValidForm(false);
      }
    }
  };

  const handelSbmit = (e) => {
    e.preventDefault();
    dispatch(recoverPassword(email));
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
          label="Email"
          name="email"
          variant="outlined"
          required
          placeholder="email@eamil.com"
          error={emailError}
          helperText={emailError ? "Invalid format email" : ""}
        />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          color="success"
          disabled={!validForm}
        >
          Recover
        </Button>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={message} sx={{ width: "100%" }}>
          {recoverPasswordInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecoverPassword;
