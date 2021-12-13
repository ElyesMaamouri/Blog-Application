import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArticleIcon from "@mui/icons-material/Article";
import CardContent from "@mui/material/CardContent";
import { displayCommentsPerPage } from "../store/actions/commentActions";
import { listArticlePerPage } from "../store/actions/articleActions";
import { getListClient } from "../store/actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import "./cardDashBoard.css";
const CardDashBoard = () => {
  const [articles, setArticles] = useState();
  const [comments, setComments] = useState();
  const [users, setUsers] = useState();
  const dispatch = useDispatch();
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );
  const displayComments = useSelector(
    (state) => state.comment.listCommentsPerPage
  );
  const listOfUser = useSelector((state) => state.client.listClientInfo);
  useEffect(() => {
    console.log("useEffect 1...");
    dispatch(listArticlePerPage(1));
    dispatch(displayCommentsPerPage(1));
    dispatch(getListClient(1));
  }, []);

  // Wait reponse from api
  useEffect(() => {
    console.log("useEffect 2...");
    listOfArticlePerPage && setArticles(listOfArticlePerPage.numberOfArticles);
    displayComments && setComments(displayComments.numberOfComments);
    listOfUser && setUsers(listOfUser.numberOfClients);
  }, [listOfArticlePerPage, displayComments, listOfUser]);

  return (
    // <div className="card-dashboard">
    //   <Card>
    //     <CardHeader
    //       title={articles}
    //       action={<ArticleIcon fontSize="large"></ArticleIcon>}
    //     />
    //   </Card>
    //   <Card>
    //     <CardHeader
    //       title={comments}
    //       action={<CommentIcon fontSize="large"></CommentIcon>}
    //     />
    //   </Card>

    //   <Card>
    //     <CardHeader
    //       title={users}
    //       action={<PeopleAltIcon fontSize="large"></PeopleAltIcon>}
    //     />
    //   </Card>
    // </div>

    <div class="main-part">
      <div class="cpanel">
        <div class="icon-part">
          <i class="fa fa-users" aria-hidden="true"></i>
          <small>Members</small>
          <p>{users}</p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
      <div class="cpanel cpanel-green">
        <div class="icon-part">
          <i class="fa fa-money" aria-hidden="true"></i>
          <small>Account</small>
          <p>$ 9200000 </p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
      <div class="cpanel cpanel-orange">
        <div class="icon-part">
          <i class="fa fa-bell" aria-hidden="true"></i>
          <small>Alert</small>
          <p>11 New</p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
      <div class="cpanel cpanel-blue">
        <div class="icon-part">
          <i class="fa fa-tasks" aria-hidden="true"></i>
          <small>Article</small>
          <p>{articles}</p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
      <div class="cpanel cpanel-red">
        <div class="icon-part">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          <small>Cart</small>
          <p>$ 45</p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
      <div class="cpanel cpanel-skyblue">
        <div class="icon-part">
          <i class="fa fa-comments" aria-hidden="true"></i>
          <small>Mentions</small>
          <p>{comments}</p>
        </div>
        <div class="card-content-part">
          <a href="#">More Details </a>
        </div>
      </div>
    </div>
  );
};

export default CardDashBoard;
