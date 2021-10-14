import React from "react";
import "./card.css";
const Card = () => {
  return (
    <div className="body_item ">
      <div className="blog-item">
        <a href="#">
          <div className="icon">
            <img src={require("../../assets/mountains.jpg").default} alt="" />
          </div>
          <div className="content">
            <div className="title">
              Lorem Ipsum, dizgi ve baskı
              <span className="blog-date">27.12.2017</span>
            </div>
            <div className="rounded"></div>

            <p>
              Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
              metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
              hurufat numune kitabı...
            </p>
          </div>

          <div className="item-arrow">
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Card;
