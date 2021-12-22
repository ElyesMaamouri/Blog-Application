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

  const [dataPage, setDataPage] = useState(1);
  const [blog, setBlog] = useState("");
  const initialState = {
    pageValue: 1,
  };

  const [pageValue, setPageValue] = useState(initialState.pageValue);
  const [voteValue, setVoteValue] = useState("");
  const [filedSearch, setFiledSerach] = useState("");

  const [loading, setLoading] = useState(false);
  console.log("pages ===>", pageValue);

  useEffect(() => {
    if (filedSearch) {
      dispatch(listArticleSearched(filedSearch.search, pageValue));
    } else {
      console.log("fire 1 ..");
      dispatch(listArticlePerPage(pageValue));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pageValue]);

  useEffect(() => {
    console.log("fire 4 ..");
    listOfArticlesByNumberOfLikes();
  }, [listOfArticleByLikes]);

  useEffect(() => {
    console.log("fire 2 ..");
    if (voteValue) {
      dispatch(listArticlePerLike(voteValue, pageValue));
      window.scrollTo({ top: 200, behavior: "smooth" });
      // setPage(listOfArticleByLikes && listOfArticleByLikes.totalPage);
    } else if (
      listOfArticleSearched &&
      listOfArticleSearched.message === "Result of search"
    ) {
      console.log("fire 2 -- 1 ..");
      // setPageValue(1);
      setDataPage(
        listOfArticleSearched && listOfArticleSearched.numberOfRecords
      );
      articleSearched();
    } else if (
      listOfArticleSearched &&
      listOfArticleSearched.message === "Sorry ! No result of your search"
    ) {
      console.log("fire 2 -- 3 ..", listOfArticleSearched.message);
      setBlog("Sorry ! No result of your search");
      setDataPage(0);
    } else {
      console.log("fire 2 -- 2..");
      listOfArticles();
      setDataPage(listOfArticlePerPage && listOfArticlePerPage.totalPage);
    }
  }, [
    listOfArticlePerPage,
    voteValue,
    dataPage,
    listOfArticleSearched,
    // pageValue,
  ]);

  // useEffect(() => {
  //   console.log("fire 3 ..");
  //   articleSearched();

  //   // setPage(
  //   //   listOfArticleSearched &&
  //   //     listOfArticleSearched.resultOfSearched[0].totalRecords[0].total
  //   // );
  // }, [listOfArticleSearched]);

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
    setLoading(true);
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
    //setPageValue(initialState.pageValue);
    setLoading(true);
  };
  const handelChangeInputSearch = (e) => {
    setFiledSerach({ ...filedSearch, [e.target.name]: e.target.value });
  };
  const handelSbmit = (e) => {
    e.preventDefault();
    setPageValue(1);
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
      <div className="body_item">
        <h1>{blog}</h1>
      </div>
      <Paginations
        count={dataPage}
        pageValue={pageValue}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Card;
