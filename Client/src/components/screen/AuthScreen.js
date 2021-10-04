import React from "react";
import SignUp from "../auth/SingUp";
import SignIn from "../auth/SignIn";
import RecoverPassword from "../auth/RecoverPassword";
import ResetPassword from "../auth/ResetPassword";
import logoUser from "../../assets/user.svg";
import "./authScreen.css";
import { useParams, useHistory, useLocation } from "react-router-dom";

const AuthScreen = (props) => {
  console.log("hello");
  let { token } = useParams();
  const location = useLocation();
  const history = useHistory();

  console.log("history", history);
  const operation = props.match.path;

  // const operationUser = operation.replace("/", "");
  // const clientOperation =
  //   operationUser.charAt(0).toUpperCase() + operationUser.slice(1);
  let data = "";
  if (operation === "/signup") {
    data = <SignUp client={props} />;
  } else if (operation === "/signin") {
    data = <SignIn client={props} />;
  } else if (operation === "/recover-password") {
    data = <RecoverPassword client={props} />;
  } else if (operation === "/reset-password/:token") {
    data = <ResetPassword client={props} />;
  }

  return (
    <div className="auth">
      <div className="leftside "></div>
      <div className="rightside">
        <img className="user" src={logoUser} />
        {data}
      </div>
    </div>
  );
};

export default AuthScreen;
