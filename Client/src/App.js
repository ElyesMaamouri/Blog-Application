import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SingUp";
import SignIn from "./components/auth/SignIn";
import AuthScreen from "./components/screen/AuthScreen";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route path="/sigin" component={SignUp} /> 
            {/* <Route path="/sigin" component={SignIn} /> */}
            <Route path={["/signup", "/signin"]} component={AuthScreen} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
