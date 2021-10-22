import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import decodeTokens from "../../helpers/decodeToken";
import { addArticle } from "../store/actions/articleActions";
import { listCategories } from "../store/actions/categoryActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import "./createArticle.css";

const CreateArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const articleInfo = useSelector((state) => state.blog.articleInfo);
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const [category, setCategory] = useState("");
  const currentlyUser = decodeTokens();
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Position Snackbar
  const vertical = "bottom";
  const horizontal = "left";

  useEffect(() => {
    if (articleInfo === "Your article has been successfully created") {
      setMessage("success");

      return articleInfo;
    } else if (articleInfo === "Error occurred add article") {
      setMessage("warning");

      return articleInfo;
    }
    dispatch(listCategories());
  }, [dispatch, articleInfo]);

  // const handelChange = (e) => {  // const handleChangeFile = (e) => {
  //   setFile(e.target.files[0]);
  // };
  //   setArticle({ ...article, [e.target.name]: e.target.value });
  // };

  const onSubmit = (data, e) => {
    const formData = new FormData();
    formData.append("fileUpload", data.picture[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("author", currentlyUser.id);
    console.log("data article", data);
    dispatch(addArticle(formData));

    setOpen(true);
  };
  const handleChange = (e) => {
    console.log("slect value, ", e.target.value);
    setCategory(e.target.value);
    if (e.target.value) unregister(["category"]);
  };

  // const { ref, ...inputProps } = register("title", {
  //   required: "You need a title",
  //   minLength: { value: 3, message: "Please enter a longer title" },
  //   maxLength: { value: 50, message: "Please enter a shorter title" },
  // });

  // const { ref, ...inputProps } = register("content", {
  //   required: "You need a content",
  //   minLength: { value: 10, message: "Please enter a longer content" },
  //   maxLength: { value: 200, message: "Please enter a shorter content" },
  // });

  return (
    <div className="create-article">
      {console.log("is Rendering..")}
      <div className="add-article ">
        <form onSubmit={handleSubmit(onSubmit)} className="form-article ">
          <Snackbar
            open={open}
            autoHideDuration={900000}
            anchorOrigin={{ vertical, horizontal }}
            onClose={() => setOpen(false)}
          >
            <Alert severity={message} sx={{ width: "100%" }}>
              {articleInfo}
            </Alert>
          </Snackbar>
          <h3>CreateArticle</h3>
          <TextField
            size="medium"
            placeholder="Title of article"
            label="Title of article"
            variant="outlined"
            name="Title"
            {...register("title", {
              required: "Title required",
              minLength: { value: 3, message: "Please enter a longer title" },
              maxLength: { value: 10, message: "Please enter a shorter title" },
            })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />

          <TextField
            multiline
            rows={4}
            placeholder="Content of article"
            size="medium"
            label="Content of article"
            variant="outlined"
            name="Title"
            {...register("content", {
              required: "Content required",
              minLength: { value: 5, message: "Please enter a longer content" },
              maxLength: {
                value: 100,
                message: "Please enter a shorter content",
              },
            })}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
          />

          {/* Select */}
          <FormControl>
            <InputLabel id="demo-simple-select-error-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={category || ""}
              label="Age"
              {...register("category", {
                required: "category required",
              })}
              control={control}
              error={Boolean(errors.category)}
              helperText={errors.category?.message}
              onChange={handleChange}
              // renderValue={(value) => `⚠️  - ${value}`}
            >
              {categoryInfo &&
                categoryInfo.categories.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.category}
                  </MenuItem>
                ))}
            </Select>
            {/* <p>{errors.category && errors.category.message}</p> 
            {/* <FormHelperText{errors.category && errors.category.message}></FormHelperText> */}
          </FormControl>

          <TextField
            type="file"
            label="Choose picture"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="picture"
            {...register("picture", {
              required: "required picture",
            })}
            error={Boolean(errors.picture)}
            helperText={errors.picture?.message}
          />

          <input
            type="submit"
            class="btn main-btn pull-right"
            value="Add article"
          />
        </form>
      </div>
      <div class=" text-center card-box">
        <div class="member-card pt-2 pb-2">
          <div class="thumb-lg member-thumb mx-auto">
            <img
              src={`http://localhost:4000/${currentlyUser.avatar}`}
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
                href="https://www.facebook.com/"
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
                href="https://twitter.com/"
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
                href="https://www.skype.com/"
                data-original-title="Skype"
              >
                <i class="fa fa-skype"></i>
              </a>
            </li>
          </ul>
          <NavLink
            class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
            to="/update-profile"
          >
            Go to your Profile
          </NavLink>
          <div class="mt-4">
            <div class="row ">
              <div class="col-4 col-xs-12">
                <div class="mt-3">
                  <h4>{currentlyUser.blogs.length}</h4>
                  <p class="mb-0 text-muted"> Posts</p>
                </div>
              </div>
              <div class="col-4 col-xs-12">
                <div class="mt-3">
                  <h4>2563</h4>
                  <p class="mb-0 text-muted"> Vote</p>
                </div>
              </div>
              <div class="col-4 col-xs-12">
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
