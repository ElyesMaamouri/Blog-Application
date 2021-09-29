import React from "react";
import SignUp from "../auth/SingUp";
import SignIn from "../auth/SignIn";
import logoUser from "../../assets/user.svg";
import "./authScreen.css";

const AuthScreen = (props) => {
  const operation = props.match.path;
  // const operationUser = operation.replace("/", "");
  // const clientOperation =
  //   operationUser.charAt(0).toUpperCase() + operationUser.slice(1);
  let data = "";
  if (operation === "/signup") {
    console.log("operation", operation);
    data = <SignUp client={props} />;
  } else if (operation === "/signin") {
    data = <SignIn client={operation} />;
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
