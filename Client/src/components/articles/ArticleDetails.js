import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogsDetails } from "../store/actions/articleActions";
import {
  addCommentToArticle,
  resetStateComment,
} from "../store/actions/commentActions";
import RightCard from "../cards/RightCard";
import decodeTokens from "../../helpers/decodeToken";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import * as dayjs from "dayjs";
import "./articleDetails.css";

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const articleDetails = useSelector((state) => state.blog.articleDetails);
  const commentInfo = useSelector((state) => state.comment.commentInfo);
  const [articleData, setArticleData] = useState();
  const [commentData, setCommentData] = useState();
  const [numberComments, setNumberComments] = useState();
  const [addComment, setAddComment] = useState();
  const [open, setOpen] = useState(false);
  const vertical = "bottom";
  const horizontal = "left";
  const currentlyUser = decodeTokens();
  let slug = useParams();
  useEffect(() => {
    dispatch(blogsDetails(slug.id));
    articleSummury();
  }, []);

  useEffect(() => {
    articleSummury();
  }, [articleDetails]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetStateComment());
    }, 3000);
  }, [commentInfo]);

  const handleChange = (e) => {
    console.log("comment", e.target.value);
    if (e.target.value !== null) {
      setAddComment({ ...addComment, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentlyUser.exp < Date.now() / 1000) {
      alert("Please login to add comment");
    } else {
      let data = {
        content: addComment.comment,
        author: currentlyUser.id,
      };
      console.log("object", data);
      dispatch(addCommentToArticle(data, slug.id));
      setOpen(true);
    }
  };

  const articleSummury = () => {
    if (articleDetails) {
      let data = (
        <div className="card card-details">
          <img
            src={`http://localhost:4000/${articleDetails.article.author.directoryPath}/${articleDetails.article.picture}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{articleDetails.article.title} </h5>
            <p className="card-text">{articleDetails.article.content}</p>
            <p className="card-text">
              <small className="text-muted">
                Posted By : {articleDetails.article.author.userName} At{" "}
                {dayjs(articleDetails.article.createAt).format(
                  " MM/DD/YY H:mm:ss A Z"
                )}
              </small>
            </p>
          </div>
        </div>
      );
      setArticleData(data);

      let comment =
        articleDetails &&
        articleDetails.article.comments.map((item) => {
          return (
            <div className="media">
              <p className="pull-right">
                <small>
                  {dayjs(item.createAt).format(" MM/DD/YY H:mm:ss A Z")}
                </small>
              </p>
              <a className="media-left" href="#">
                <img src={`http://localhost:4000/${item.author.avatar}`} />
              </a>
              <div className="media-body">
                <h4 className="media-heading user_name">
                  {item.author.userName}
                </h4>
                {item.content}
                <p>
                  <small>
                    <a href="">Like</a> - <a href="">Share</a>
                  </small>
                </p>
              </div>
            </div>
          );
        });
      setCommentData(comment);
      setNumberComments(articleDetails.numberOfComment);
    }
  };

  return (
    <>
      <div classNameName="details">
        {articleData}
        <RightCard />
      </div>

      <div className="col-md-8 section-comment">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="comment">Your Comment</label>
            <textarea
              name="comment"
              className="form-control"
              rows="5"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Button
            variant="contained"
            className="button-send"
            type="submit"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
        <p>{commentInfo}</p>
        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={commentInfo}
          key={vertical + horizontal}
          autoHideDuration={2000}
        /> */}

        <div className="page-header">
          <h3 className="pull-right">{numberComments} comments</h3>
          <h3>Comments</h3>
        </div>
        <div className="comments-list">{commentData}</div>
      </div>
    </>
  );
};

export default ArticleDetails;
