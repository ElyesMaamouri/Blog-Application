import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticlePerPage,
  listArticlePerLike,
  listArticleSearched,
} from "../store/actions/articleActions";
import decodeTokens from "../../helpers/decodeToken";
import Paginations from "../pagination/Paginations";
import * as dayjs from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
  const listOfArticleSearched = useSelector(
    (state) => state.blog.listArticleSearchedInfo
  );
  console.log("listOfArticleSearched", listOfArticleSearched);

  const [dataPage, setDataPage] = useState(1);
  const [blog, setBlog] = useState();
  const [pageValue, setPageValue] = useState(1);
  const [voteValue, setVoteValue] = useState("");
  const [filedSearch, setFiledSerach] = useState("");

  const [loading, setloading] = useState(false);
  console.log("pages ===>", pageValue);
  useEffect(() => {
    if (listOfArticleSearched) {
      dispatch(listArticleSearched(filedSearch.search, pageValue));
    } else {
      dispatch(listArticlePerPage(pageValue));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pageValue]);

  useEffect(() => {
    listOfArticlesByNumberOfLikes();
  }, [listOfArticleByLikes]);

  useEffect(() => {
    if (voteValue) {
      dispatch(listArticlePerLike(voteValue, pageValue));
      window.scrollTo({ top: 200, behavior: "smooth" });
      // setPage(listOfArticleByLikes && listOfArticleByLikes.totalPage);
    } else if (listOfArticleSearched) {
      setDataPage(
        listOfArticleSearched &&
          Math.ceil(
            listOfArticleSearched.resultOfSearched[0].totalRecords[0].total /
              listOfArticleSearched.size
          )
      );
    } else {
      listOfArticles();
      setDataPage(listOfArticlePerPage && listOfArticlePerPage.totalPage);
    }
  }, [
    listOfArticlePerPage,
    voteValue,
    dataPage,
    listOfArticleSearched,
    pageValue,
  ]);

  useEffect(() => {
    articleSearched();

    // setPage(
    //   listOfArticleSearched &&
    //     listOfArticleSearched.resultOfSearched[0].totalRecords[0].total
    // );
  }, [listOfArticleSearched]);

  const handleChange = (event, value) => {
    console.log("value", value);
    setPageValue(value);
  };

  const handleChangeLike = (e) => {
    if (e.target.value === "Most Liked") {
      setVoteValue("betterVote");
    }
    if (e.target.value === "Worse Liked") {
      setVoteValue("worseVote");
    }
  };

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
    //setloading(true);
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
    //setloading(true);
    setBlog(data);
  };

  const articleSearched = () => {
    let data =
      listOfArticleSearched &&
      listOfArticleSearched.resultOfSearched[0].data.map((item) => {
        return (
          <div className="blog-item" key={item._id}>
            <Link to={"/article/" + item._id}>
              <div className="icon">
                <img
                  src={`http://localhost:4000/${item.author[0].directoryPath}/${item.picture}`}
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
    setPageValue(1);
    setloading(true);
  };
  const handelChangeInputSearch = (e) => {
    setFiledSerach({ ...filedSearch, [e.target.name]: e.target.value });
  };
  const handelSbmit = (e) => {
    console.log("object", filedSearch);
    e.preventDefault();
    dispatch(listArticleSearched(filedSearch.search, pageValue));
  };
  return (
    <div>
      Sort by :
      <div className="like">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Number Of Likes
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            defaultValue={"Number Of Likes "}
            onChange={handleChangeLike}
            label="Likes"
          >
            <MenuItem value={"Most Liked"}>Most Liked</MenuItem>
            <MenuItem value={"Worse Liked"}>Worse Liked</MenuItem>
          </Select>
        </FormControl>
      </div>
      <form
        onSubmit={handelSbmit}
        style={{ display: "flex", marginLeft: "275px", marginTop: "-66px" }}
      >
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          name="search"
          onChange={handelChangeInputSearch}
        />

        <button type="button" type="submit" className="btn btn-secondary">
          <i className="bi-search"></i>
        </button>
      </form>
      {/* <button onClick={handleChangeLike}>Most Liked</button>
      <button onClick={handleChangeLike}>Worse Liked</button> */}
      <div className="body_item">{blog}</div>
      <Paginations
        count={dataPage}
        pageValue={pageValue}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Card;
