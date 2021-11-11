import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogsDetails } from "../store/actions/articleActions";
import RightCard from "../cards/RightCard";
import * as dayjs from "dayjs";
import "./articleDetails.css";
const ArticleDetails = () => {
  const dispatch = useDispatch();
  const articleDetails = useSelector((state) => state.blog.articleDetails);
  const [articleData, setArticleData] = useState();
  let slug = useParams();

  useEffect(() => {
    dispatch(blogsDetails(slug.id));
    articleSummury();
  }, []);

  useEffect(() => {
    console.log("fire.....");
    articleSummury();
  }, [articleDetails]);

  const articleSummury = () => {
    if (articleDetails) {
      let data = (
        <div class="card card-details">
          <img
            src={`http://localhost:4000/${articleDetails.article.author.directoryPath}/${articleDetails.article.picture}`}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{articleDetails.article.title} </h5>
            <p class="card-text">{articleDetails.article.content}</p>
            <p class="card-text">
              <small class="text-muted">
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
    }
  };
  console.log("artixles", articleDetails);
  return (
    <div className="details">
      {articleData}
      <RightCard />
    </div>
  );
};

export default ArticleDetails;
