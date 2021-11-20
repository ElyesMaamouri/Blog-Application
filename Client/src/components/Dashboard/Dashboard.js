import React from "react";
import CardDashBoard from "./CardDashBoard";
import ArticleDashboard from "./ArticleDashboard";
import CommentDashbord from "./CommentDashbord";
import Layout from "../layout/Layout";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Layout>
            <CardDashBoard />
            <Route exact path="/client-article" component={ArticleDashboard} />
            <Route exact path="/client-comment" component={CommentDashbord} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
};

export default Dashboard;
