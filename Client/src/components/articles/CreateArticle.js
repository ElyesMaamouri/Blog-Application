import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import decodeTokens from "../../helpers/decodeToken";
import { addArticle } from "../store/actions/articleActions";
import { listCategories } from "../store/actions/categoryActions";

import "./createArticle.css";
const CreateArticle = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const articleInfo = useSelector((state) => state.blog.articleInfo);
  const categoryInfo = useSelector((state) => state.category.categoryInfo);

  const [article, setArticle] = useState();
  const [file, setFile] = useState();
  const currentlyUser = decodeTokens();
  console.log("addd", currentlyUser.blogs.length);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  // const handelChange = (e) => {  // const handleChangeFile = (e) => {
  //   setFile(e.target.files[0]);
  // };
  //   setArticle({ ...article, [e.target.name]: e.target.value });
  // };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("fileUpload", data.picture[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("author", currentlyUser.id);
    console.log("data article", data);
    dispatch(addArticle(formData));
  };

  return (
    <div className="create-article">
      <div className="add-article">
        <form onSubmit={handleSubmit(onSubmit)} className="form-article ">
          <h3>CreateArticle</h3>
          <label>Title</label>
          <input
            {...register("title", {
              required: true,
              maxLength: 20,
              minLength: 5,
              pattern: /^[A-Za-z]+$/i,
            })}
            name="title"
            class="form-control"
          />
          {errors?.title?.type === "required" && (
            <p className="error-fields">This field is required</p>
          )}
          {errors?.title?.type === "maxLength" && (
            <p className="error-fields">
              First name cannot exceed 60 characters
            </p>
          )}
          {errors?.title?.type === "minLength" && (
            <p className="error-fields">
              First name cannot exceed 60 characters
            </p>
          )}
          {errors?.title?.type === "pattern" && (
            <p className="error-fields">Alphabetical characters only</p>
          )}
          <label>Content</label>
          <textarea
            {...register("content", {
              required: true,
              maxLength: 1000,
              minLength: 10,
            })}
            rows="4"
            cols="80"
            name="content"
            class="form-control"
          ></textarea>
          {errors?.content?.type === "required" && (
            <p className="error-fields">This field is required</p>
          )}
          {errors?.content?.type === "maxLength" && (
            <p className="error-fields">
              Content cannot exceed 1000 characters
            </p>
          )}
          {errors?.content?.type === "minLength" && (
            <p className="error-fields">Content min 10 characters</p>
          )}
          <label>Choose category of article:</label>
          <select
            name="category"
            className="form-control"
            {...register("category", {
              required: true,
            })}
          >
            <option value="">--Please choose an option--</option>
            {categoryInfo &&
              categoryInfo.categories.map((item) => (
                <option
                  key={item._id}
                  type="radio"
                  name="category"
                  value={item._id}
                  id="field-rain"
                >
                  {item.category}
                </option>
              ))}
          </select>
          {errors?.category?.type === "required" && (
            <p className="error-fields">input radio required</p>
          )}
          <label>Choose picture</label>
          <input
            {...register("picture", {
              required: true,
            })}
            type="file"
            name="picture"
            // onChange={handleChangeFile}
            className="form-control"
          />
          {errors?.picture?.type === "required" && (
            <p className="error-fields">Picture is required</p>
          )}

          <input
            type="submit"
            class="btn main-btn pull-right"
            value="Add article"
          />
          {articleInfo}
        </form>
      </div>
      <div class=" text-center card-box">
        <div class="member-card pt-2 pb-2">
          <div class="thumb-lg member-thumb mx-auto">
            <img
              src="http://localhost:4000/corvette_back-1634046091829.png"
              class="rounded-circle img-thumbnail"
              alt="profile-image"
            />
          </div>
          <div class="">
            <h4>{currentlyUser.name}</h4>
            <p class="text-muted">
              @Founder <span>| </span>
              <span>
                <a href="#" class="text-pink">
                  {currentlyUser.email}
                </a>
              </span>
            </p>
          </div>
          <ul class="social-links list-inline">
            <li class="list-inline-item">
              <a
                title=""
                data-placement="top"
                data-toggle="tooltip"
                class="tooltips"
                href=""
                data-original-title="Facebook"
              >
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                title=""
                data-placement="top"
                data-toggle="tooltip"
                class="tooltips"
                href=""
                data-original-title="Twitter"
              >
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                title=""
                data-placement="top"
                data-toggle="tooltip"
                class="tooltips"
                href=""
                data-original-title="Skype"
              >
                <i class="fa fa-skype"></i>
              </a>
            </li>
          </ul>
          <button
            type="button"
            class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
          >
            Go to your Profile
          </button>
          <div class="mt-4">
            <div class="row">
              <div class="col-4">
                <div class="mt-3">
                  <h4>{currentlyUser.blogs.length}</h4>
                  <p class="mb-0 text-muted"> Posts</p>
                </div>
              </div>
              <div class="col-4">
                <div class="mt-3">
                  <h4>2563</h4>
                  <p class="mb-0 text-muted"> Vote</p>
                </div>
              </div>
              <div class="col-4">
                <div class="mt-3">
                  <h4>2563</h4>
                  <p class="mb-0 text-muted"> Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
