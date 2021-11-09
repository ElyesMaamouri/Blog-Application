import React, { useState, useEffect } from "react";
import { listCategories } from "../store/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./right-card.css";

const RightCard = (props) => {
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  console.log("props", props.match);

  useEffect(() => {
    dispatch(listCategories());
  }, []);

  return (
    <div className="right-card">
      <div class="card">
        <div class="card-header">
          <i class="bi bi-card-list icon-category"> Category</i>
        </div>
        <ul class="list-group list-group-flush">
          {categoryInfo &&
            categoryInfo.categories.map((item, index) => (
              <Link
                class="list-group-item item-card"
                to={"/category/" + item._id}
                key={item._id}
              >
                {item.category} ({item.articles.length})
              </Link>
            ))}
        </ul>
      </div>
      <div class="card card-style">
        <div class="card-header">
          <i class="bi bi-book-half icon-category"> Last Article</i>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item item-card">An item</li>
          <li class="list-group-item item-card">A second item</li>
          <li class="list-group-item item-card">A third item</li>
        </ul>
      </div>

      <div class="card card-style">
        <div class="card-header">
          <i class="bi bi-chat-left-dots icon-category"> Last Comment</i>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item item-card">An item</li>
          <li class="list-group-item item-card">A second item</li>
          <li class="list-group-item item-card">A third item</li>
        </ul>
      </div>
    </div>
  );
};

export default RightCard;
