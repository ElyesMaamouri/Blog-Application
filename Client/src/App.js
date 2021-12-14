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
import NotFound from "./components/not-found/NotFound";
import decodeTokens from "./helpers/decodeToken";
import { Redirect } from "react-router";

// Route admin
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = decodeTokens();
      if (!localStorage.getItem("userDetails")) {
        // not logged in so redirect to 404 page
        return <Route component={NotFound} />;
      }
      // check if route is restricted by role
      if (currentUser.isAdmin === false) {
        // role not authorised so redirect to 404 page
        return <Route component={NotFound} />;
      }
      // authorised so return component
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

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

            {/* <PrivateRoute
              path={["/dashbord/admin", "/dashbord/client-article"]}
              component={Dashboard}
            /> */}
            <PrivateRoute path="/dashbord/admin" component={Dashboard} />

            <PrivateRoute
              path="/dashbord/client-article"
              component={ArticleDashboard}
            />

            <PrivateRoute
              path="/dashbord/client-comment"
              component={CommentDashbord}
            />
            <PrivateRoute
              path="/dashbord/list-clients"
              component={ClientDashbord}
            />
            <PrivateRoute
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
            {/* <Route exact path="/signup">
              {localStorage.getItem("userDetails") ? (
                <Redirect to="/" />
              ) : (
                <AuthScreen />
              )}
            </Route> */}
            <Route path={["/signup", "/signin"]}>
              {localStorage.getItem("userDetails") ? (
                <Redirect to="/" />
              ) : (
                <Route path={["/signup", "/signin"]} component={AuthScreen} />
              )}
            </Route>

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
              <Route
                path={["/recover-password", "/reset-password/:token"]}
                component={AuthScreen}
              />
              <Route component={NotFound} />
            </>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
