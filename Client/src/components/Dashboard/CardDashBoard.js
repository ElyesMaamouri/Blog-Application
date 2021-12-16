import React, { useState, useEffect } from "react";

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
  }, [dispatch]);

  // Wait reponse from api
  useEffect(() => {
    console.log("useEffect 2...");
    listOfArticlePerPage && setArticles(listOfArticlePerPage.numberOfArticles);
    displayComments && setComments(displayComments.numberOfComments);
    listOfUser && setUsers(listOfUser.numberOfClients);
  }, [listOfArticlePerPage, displayComments, listOfUser]);

  return (
    // <div classNameName="card-dashboard">
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

    <div className="main-part">
      <div className="cpanel">
        <div className="icon-part">
          <i className="fa fa-users" aria-hidden="true"></i>
          <small>Members</small>
          <p>{users}</p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/dashbord/list-clients">More Details</a>
        </div>
      </div>
      <div className="cpanel cpanel-green">
        <div className="icon-part">
          <i className="fa fa-money" aria-hidden="true"></i>
          <small>Account</small>
          <p>$ 9200000 </p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/">More Details </a>
        </div>
      </div>
      <div className="cpanel cpanel-orange">
        <div className="icon-part">
          <i className="fa fa-bell" aria-hidden="true"></i>
          <small>Alert</small>
          <p>11 New</p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/">More Details </a>
        </div>
      </div>
      <div className="cpanel cpanel-blue">
        <div className="icon-part">
          <i className="fa fa-tasks" aria-hidden="true"></i>
          <small>Article</small>
          <p>{articles}</p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/">More Details </a>
        </div>
      </div>
      <div className="cpanel cpanel-red">
        <div className="icon-part">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <small>Cart</small>
          <p>$ 45</p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/">More Details </a>
        </div>
      </div>
      <div className="cpanel cpanel-skyblue">
        <div className="icon-part">
          <i className="fa fa-comments" aria-hidden="true"></i>
          <small>Mentions</small>
          <p>{comments}</p>
        </div>
        <div className="card-content-part">
          <a href="http://localhost:3000/">More Details </a>
        </div>
      </div>
    </div>
  );
};

export default CardDashBoard;
