import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SingUp";
import SignIn from "./components/auth/SignIn";
import AuthScreen from "./components/screen/AuthScreen";
import Home from "./components/home/Home";
import RecoverPassword from "./components/auth/RecoverPassword";
import ResetPassword from "./components/auth/ResetPassword";
import CreateArticle from "./components/articles/CreateArticle";
import Navbar from "./components/navbar/Navbar";
import UpdateProfile from "./components/profile/UpdateProfile";
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
            <div>
              <Navbar />
              <Route exact path="/" component={Home} />
              {/* <Route path="/:token" component={ResetPassword} /> */}
              {/* <Route path="/recover-password" component={RecoverPassword} />
            <Route path="/reset-password" component={ResetPassword} /> */}
              <Route exact path="/create-article" component={CreateArticle} />
              <Route exact path="/update-profile" component={UpdateProfile} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
