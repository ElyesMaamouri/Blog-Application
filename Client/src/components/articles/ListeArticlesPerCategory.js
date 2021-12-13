import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listCategoryById } from "../store/actions/categoryActions";
const ListeArticlesPerCategory = () => {
  const dispatch = useDispatch();
  let categoryId = useParams();
  const [articles, setArticles] = useState();
  const [numberOfArticles, setNumberOfArticles] = useState();
  const [nameCategory, setNameCategory] = useState();
  const categoryArticleInfo = useSelector(
    (state) => state.category.categoryByIdInfo
  );

  useEffect(() => {
    dispatch(listCategoryById(categoryId.id));
  }, []);

  useEffect(() => {
    blogsByCategory();
    itemCategory();
  }, [categoryArticleInfo]);

  console.log("categoryArticleInfo", nameCategory);

  const blogsByCategory = () => {
    let data =
      categoryArticleInfo &&
      categoryArticleInfo[0].category.articles.map((item, index) => {
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
              </div>

              <div className="item-arrow">
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </a>
          </div>
        );
      });
    setArticles(data);
    if (categoryArticleInfo && categoryArticleInfo[0]) {
      setNumberOfArticles(categoryArticleInfo[0].numberOfArticle);
    }
  };

  const itemCategory = () => {
    const category =
      categoryArticleInfo && categoryArticleInfo[0].category.category;
    console.log("categ", category);
    setNameCategory(category);
  };
  return (
    <div>
      <h3>
        Category : {nameCategory} / Number of articles : {numberOfArticles}
      </h3>
      {articles}
    </div>
  );
};

export default ListeArticlesPerCategory;
