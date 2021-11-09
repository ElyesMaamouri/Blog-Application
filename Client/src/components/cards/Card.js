import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticlePerPage } from "../store/actions/articleActions";
import decodeTokens from "../../helpers/decodeToken";
import Paginations from "../pagination/Paginations";
import "./card.css";

const Card = () => {
  const dispatch = useDispatch();
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );
  const [page, setPage] = useState(1);
  const [blog, setBlog] = useState();
  const [pageValue, setPageValue] = useState(1);

  useEffect(() => {
    dispatch(listArticlePerPage(pageValue));
  }, []);

  useEffect(() => {
    dispatch(listArticlePerPage(pageValue));
  }, [pageValue]);

  useEffect(() => {
    listOfArticles();
    setPage(listOfArticlePerPage && listOfArticlePerPage.totalPage);
  }, [listOfArticlePerPage]);

  const handleChange = (event, value) => {
    setPageValue(value);
  };
  const listOfArticles = () => {
    let data =
      listOfArticlePerPage &&
      listOfArticlePerPage.articles.map((item) => {
        return (
          <div className="blog-item" key={item._id}>
            <a href="#">
              <div className="icon">
                <img
                  src={`http://localhost:4000/${item.author.directoryPath}/${item.picture}`}
                  alt=""
                />
              </div>
              <div className="content">
                <div className="title">
                  {item.title}
                  <span className="blog-date">{item.createAt}</span>
                </div>
                <div className="rounded"></div>

                <p>{item.content}</p>

                <p>Vote : {item.vote}</p>
              </div>

              <div className="item-arrow">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </a>
          </div>
        );
      });
    setBlog(data);
  };

  return (
    <div>
      <div className="body_item">{blog}</div>
      <Paginations count={page} page={pageValue} handleChange={handleChange} />
    </div>
  );
};

export default Card;
