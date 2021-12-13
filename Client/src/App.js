import React, { Component, Fragment } from "react";
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
import ListeArticle from "./components/articles/ListeArticle";
import ListeArticlesPerCategory from "./components/articles/ListeArticlesPerCategory";
import ArticleDetails from "./components/articles/ArticleDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import CommentDashbord from "./components/Dashboard/CommentDashbord";
import ClientDashbord from "./components/Dashboard/ClientDashbord";
import ArticleDashboard from "./components/Dashboard/ArticleDashboard";
import CategoryDashbord from "./components/Dashboard/CategoryDashbord";
import Layout from "./components/layout/Layout";
import { Redirect } from "react-router";

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

const SignOutLayoutRoute = ({ component: Component, secure, ...rest }) => {
  return (
    <Fragment>
      {secure ? (
        <Fragment>
          {localStorage.getItem("userDetails") ? (
            <Route
              {...rest}
              render={(props) => (
                <>
                  <Navbar />
                  <Component {...props} />
                </>
              )}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Fragment>
      ) : (
        <Route
          {...rest}
          render={(props) => (
            <>
              <Navbar />
              <Component {...props} />
            </>
          )}
        />
      )}
    </Fragment>
  );
};

class App extends Component {
  render() {
    console.log("this is app");
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Layout>
              <Route exact path="/dashbord/admin" component={Dashboard} />
              <Route path="/" component={Home} />
            </Layout> */}

            <DashboardLayoutRoute
              path="/dashbord/admin"
              component={Dashboard}
            />

            <DashboardLayoutRoute
              path="/dashbord/client-article"
              component={ArticleDashboard}
            />

            <DashboardLayoutRoute
              path="/dashbord/client-comment"
              component={CommentDashbord}
            />
            <DashboardLayoutRoute
              path="/dashbord/list-clients"
              component={ClientDashbord}
            />
            <DashboardLayoutRoute
              path="/dashbord/list-category"
              component={CategoryDashbord}
            />
            <SignOutLayoutRoute
              exact
              path="/"
              component={Home}
              secure={false}
            />

            <SignOutLayoutRoute
              exact
              path="/create-article"
              component={CreateArticle}
              secure={true}
            />

            <SignOutLayoutRoute
              exact
              path="/article/:id"
              component={ArticleDetails}
            />
            <SignOutLayoutRoute
              exact
              path="/list-article"
              component={ListeArticle}
            />
            <SignOutLayoutRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />
            <SignOutLayoutRoute
              exact
              path="/category/:id"
              component={ListeArticlesPerCategory}
            />

            {/* <Route exact path="/dashbord/admin" >
              <Layout>
                <Dashboard />
              </Layout>
            </Route> */}

            {/*  <Route path="/" component={Home}>
              <Navbar />
              <Home />
            </Route> */}

            {/* <Layout />
              <Route exact path="/dashbord/admin" component={Dashboard} />
              <Route
                exact
                path="/client-article"
                component={ArticleDashboard}
              />
              <Route exact path="/client-comment" component={CommentDashbord} />
      */}
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

            <>
              {/* <Route path="/:token" component={ResetPassword} /> */}
              {/* <Route path="/recover-password" component={RecoverPassword} />
            <Route path="/reset-password" component={ResetPassword} /> */}
              <Route exact path="/create-article" component={CreateArticle} />
              <Route exact path="/update-profile" component={UpdateProfile} />
              <Route exact path="/list-article" component={ListeArticle} />
              <Route
                exact
                path="/category/:id"
                component={ListeArticlesPerCategory}
              />
            </>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
