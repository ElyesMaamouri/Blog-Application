import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticlePerPage,
  listArticlePerLike,
} from "../store/actions/articleActions";
import decodeTokens from "../../helpers/decodeToken";
import Paginations from "../pagination/Paginations";
import * as dayjs from "dayjs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ArticleDetails from "../articles/ArticleDetails";
import { Link } from "react-router-dom";
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
    console.log("target ", e.target.value);
    if (e.target.value === "Most Liked") {
      setVoteValue("betterVote");
    }
    if (e.target.value === "Worse Liked") {
      setVoteValue("worseVote");
    }
  };
  console.log("listOfArticlePerPage", listOfArticlePerPage);
  const listOfArticles = () => {
    let data =
      listOfArticlePerPage &&
      listOfArticlePerPage.articles.map((item) => {
        return (
          <div className="blog-item" key={item._id}>
            <Link to={"/article/" + item._id}>
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

                <p>
                  <ThumbUpAltIcon /> : {item.vote}
                </p>
              </div>

              <div className="item-arrow">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </Link>
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
            <Link to={"/article/" + item._id}>
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

                <p>
                  <ThumbUpAltIcon /> : {item.vote}
                </p>
              </div>

              <div className="item-arrow">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </Link>
          </div>
        );
      });

    setBlog(data);
  };
  return (
    <div>
      Sort by :
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Number Of Likes
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          //value={age}
          onChange={handleChangeLike}
          label="Likes"
        >
          <MenuItem value={"Most Liked"}>Most Liked</MenuItem>
          <MenuItem value={"Worse Liked"}>Worse Liked</MenuItem>
        </Select>
      </FormControl>
      {/* <button onClick={handleChangeLike}>Most Liked</button>
      <button onClick={handleChangeLike}>Worse Liked</button> */}
      <div className="body_item">{blog}</div>
      <Paginations count={page} page={pageValue} handleChange={handleChange} />
    </div>
  );
};

export default Card;
