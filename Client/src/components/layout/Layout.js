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
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";

const drawerWidth = 240;
const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
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
      path: "/client-article",
    },
    {
      text: "Comments",
      icon: <CommentIcon />,
      path: "/client-comment",
    },

    {
      text: "Users",
      icon: <PeopleAltIcon />,
      path: "/list-article",
    },
  ];
  return (
    <div className={classes.root}>
      {console.log("layouttt")}
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
      </Drawer>
      <div className={classes.page}>{children} </div>
    </div>
  );
};

export default Layout;
