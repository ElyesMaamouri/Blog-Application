import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArticleIcon from "@mui/icons-material/Article";
import CardContent from "@mui/material/CardContent";
import "./cardDashBoard.css";
const CardDashBoard = () => {
  return (
    <div className="card-dashboard">
      <Card>
        <CardHeader
          title="35"
          action={<CommentIcon fontSize="large"></CommentIcon>}
        />
      </Card>
      <Card>
        <CardHeader
          title="142"
          action={<ArticleIcon fontSize="large"></ArticleIcon>}
        />
      </Card>

      <Card>
        <CardHeader
          title="45"
          action={<PeopleAltIcon fontSize="large"></PeopleAltIcon>}
        />
      </Card>
    </div>
  );
};

export default CardDashBoard;
