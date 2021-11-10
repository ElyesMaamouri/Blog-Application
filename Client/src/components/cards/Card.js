import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticlePerPage,
  listArticlePerLike,
} from "../store/actions/articleActions";
import decodeTokens from "../../helpers/decodeToken";
import Paginations from "../pagination/Paginations";
import * as dayjs from "dayjs";

import "./card.css";

const Card = () => {
  const dispatch = useDispatch();
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );
  const listOfArticleByLikes = useSelector(
    (state) => state.blog.listArticleByVotes
  );

  console.log("listOfArticleByLikes", listOfArticleByLikes);

  const [page, setPage] = useState(1);
  const [blog, setBlog] = useState();
  const [pageValue, setPageValue] = useState(1);
  const [voteValue, setVoteValue] = useState("");

  console.log(
    "date ",
    dayjs("2021-11-09T08:18:10.343Z").format(" MM/DD/YY H:mm:ss A Z")
  );
  useEffect(() => {
    dispatch(listArticlePerPage(pageValue));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageValue]);

  useEffect(() => {
    listOfArticlesByNumberOfLikes();
  }, [listOfArticleByLikes]);

  useEffect(() => {
    if (voteValue) {
      dispatch(listArticlePerLike(voteValue, pageValue));
      window.scrollTo({ top: 200, behavior: "smooth" });
      // setPage(listOfArticleByLikes && listOfArticleByLikes.totalPage);
    } else {
      listOfArticles();
      setPage(listOfArticlePerPage && listOfArticlePerPage.totalPage);
    }
  }, [listOfArticlePerPage, voteValue, page]);

  const handleChange = (event, value) => {
    setPageValue(value);
  };

  const handleChangeLike = (e) => {
    if (e.target.textContent === "Most Liked") {
      setVoteValue("betterVote");
    }
    if (e.target.textContent === "Worse Liked") {
      setVoteValue("worseVote");
    }
  };
  console.log("count=", page, "page", pageValue);
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

                  <span className="blog-date">
                    {dayjs(item.createAt).format(" MM/DD/YY H:mm:ss A Z")}
                  </span>
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

  const listOfArticlesByNumberOfLikes = () => {
    let data =
      listOfArticleByLikes &&
      listOfArticleByLikes.blogs.map((item) => {
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
      <button onClick={handleChangeLike}>Most Liked</button>
      <button onClick={handleChangeLike}>Worse Liked</button>
      <div className="body_item">{blog}</div>
      <Paginations count={page} page={pageValue} handleChange={handleChange} />
    </div>
  );
};

export default Card;
