import React, { useState, useEffect } from "react";
import { listArticlePerPage } from "../store/actions/articleActions";
import { listCategories } from "../store/actions/categoryActions";
import { getComments } from "../store/actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./right-card.css";

const RightCard = (props) => {
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );
  const listCommentsInfo = useSelector(
    (state) => state.comment.listCommentsInfo
  );

  const [pageValue, setPageValue] = useState(1);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listArticlePerPage(pageValue));
    dispatch(getComments());
  }, []);

  return (
    <div className="right-card">
      <div className="card">
        <div className="card-header">
          <i className="bi bi-card-list icon-category"> Category</i>
        </div>
        <ul className="list-group list-group-flush">
          {categoryInfo &&
            categoryInfo.categoryDetails.map((item) => {
              return (
                <Link
                  key={item.id}
                  className="list-group-item item-card"
                  to={"/category/" + item.id}
                >
                  {item.nameCategory} ({item.numberOfArticle})
                </Link>
              );
            })}
        </ul>
      </div>
      <div className="card card-style">
        <div className="card-header">
          <i className="bi bi-book-half icon-category"> Last Article</i>
        </div>
        <ul className="list-group list-group-flush">
          {listOfArticlePerPage &&
            listOfArticlePerPage.articles.map((item) => {
              return (
                <Link
                  key={item._id}
                  className="list-group-item item-card"
                  to={"/article/" + item._id}
                >
                  {item.title}
                </Link>
              );
            })}
        </ul>
      </div>

      <div className="card card-style">
        <div className="card-header">
          <i className="bi bi-chat-left-dots icon-category"> Last Comment</i>
        </div>
        <ul className="list-group list-group-flush">
          {listCommentsInfo &&
            listCommentsInfo.comments.map((item) => {
              return (
                <li className="list-group-item item-card" key={item._id}>
                  {item.content} By : {item.author.userName}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default RightCard;
