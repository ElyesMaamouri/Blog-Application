import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SingUp";
import SignIn from "./components/auth/SignIn";
import AuthScreen from "./components/screen/AuthScreen";
import Home from "./components/home/Home";
import RecoverPassword from "./components/auth/RecoverPassword";
import ResetPassword from "./components/auth/ResetPassword";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route path="/sigin" component={SignUp} /> 
            {/* <Route path="/sigin" component={SignIn} /> */}
            <Route
              path={[
                "/signup",
                "/signin",
                "/recover-password",
                "/reset-password/:token",
              ]}
              component={AuthScreen}
            />
            <Route exact path="/" component={Home} />
            {/* <Route path="/:token" component={ResetPassword} /> */}
            {/* <Route path="/recover-password" component={RecoverPassword} />
            <Route path="/reset-password" component={ResetPassword} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
