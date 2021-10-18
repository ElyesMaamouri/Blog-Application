import React from "react";
import "./right-card.css";
const RightCard = () => {
  return (
    <div className="right-card">
      <div class="card">
        <div class="card-header">
          <i class="bi bi-card-list icon-category"> Category</i>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item item-card">An item</li>
          <li class="list-group-item item-card">A second item</li>
          <li class="list-group-item item-card">A third item</li>
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
