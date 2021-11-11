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

  console.log("comments0", listCommentsInfo);
  const [pageValue, setPageValue] = useState(1);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listArticlePerPage(pageValue));
    dispatch(getComments());
  }, []);

  return (
    <div className="right-card">
      <div class="card">
        <div class="card-header">
          <i class="bi bi-card-list icon-category"> Category</i>
        </div>
        <ul class="list-group list-group-flush">
          {categoryInfo &&
            categoryInfo.categoryDetails.map((item, index) => (
              <Link
                class="list-group-item item-card"
                to={"/category/" + item.id}
                key={item.id}
              >
                {item.nameCategory} ({item.numberOfArticle})
              </Link>
            ))}
        </ul>
      </div>
      <div class="card card-style">
        <div class="card-header">
          <i class="bi bi-book-half icon-category"> Last Article</i>
        </div>
        <ul class="list-group list-group-flush">
          {listOfArticlePerPage &&
            listOfArticlePerPage.articles.map((item) => {
              {
                console.log("itemmm", item.title);
              }
              return (
                <Link
                  class="list-group-item item-card"
                  to={"/article/" + item._id}
                  key={item._id}
                >
                  {item.title}
                </Link>
              );
            })}
        </ul>
      </div>

      <div class="card card-style">
        <div class="card-header">
          <i class="bi bi-chat-left-dots icon-category"> Last Comment</i>
        </div>
        <ul class="list-group list-group-flush">
          {listCommentsInfo &&
            listCommentsInfo.comments.map((item) => {
              return (
                <li class="list-group-item item-card">
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
