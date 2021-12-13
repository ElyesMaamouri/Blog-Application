import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ArticleIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import Avatar from "@mui/material/Avatar";

import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: "#f9f9f9",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    appBar: {
      "&.MuiAppBar-root": {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/dashbord/admin",
    },
    {
      text: "Articles",
      icon: <ArticleIcon />,
      path: "/dashbord/client-article",
    },
    {
      text: "Comments",
      icon: <CommentIcon />,
      path: "/dashbord/client-comment",
    },

    {
      text: "Users",
      icon: <PeopleAltIcon />,
      path: "/dashbord/list-clients",
    },
    {
      text: "Catgeory",
      icon: <CategoryIcon />,
      path: "/dashbord/list-category",
    },
    {
      text: "Profil Admin",
      icon: <AccountCircleIcon />,
      path: "/update-profile",
    },
  ];
  const logoutHandler = () => {
    if (localStorage.getItem("userDetails")) {
      localStorage.removeItem("userDetails");
      history.push("/");
    }

    // window.location.reload();
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography>DEV.TO WELCOME </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5">DashBord</Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={logoutHandler}
          variant="outlined"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Drawer>
      <div className={classes.page}>{children} </div>
    </div>
  );
};

export default Layout;
