import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import { useForm, Controller } from "react-hook-form";
import decodeTokens from "../../helpers/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { listCategories } from "../store/actions/categoryActions";
import { updateArticle, resetState } from "../store/actions/articleActions";
import "./modalAlert.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalAlert = (data) => {
  const dispatch = useDispatch();
  const updateArticleInfo = useSelector(
    (state) => state.blog.updateArticleInfo
  );
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const currentlyUser = decodeTokens();
  let choiceModal;
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setTitle(data.blog.title);
    setContent(data.blog.content);
    setCategory(data.blog.category);
  }, [data.blog.title, data.blog.content, data.blog.category]);

  useEffect(() => {
    if (updateArticleInfo === "Your article has been successfully updated") {
      setTimeout(() => {
        dispatch(resetState());
      }, 4000);
    }
  }, [updateArticleInfo]);

  useEffect(() => {
    dispatch(listCategories());
  }, []);

  const onSubmit = (item, e) => {
    const formData = new FormData();

    formData.append("title", item.title);
    formData.append("content", item.content);
    formData.append("category", item.category);
    formData.append("author", currentlyUser.id);
    dispatch(updateArticle(formData, data.blog.id));

    data.updateData({
      title: item.title,
      content: item.content,
      id: data.blog.id,
    });
    setTimeout(() => {
      data.closeModal();
    }, 2000);
  };
  const testInputTitle = register("title", {
    required: "Title required",
    minLength: {
      value: 3,
      message: "Please enter a longer title",
    },
    maxLength: {
      value: 10,
      message: "Please enter a shorter title",
    },
  });
  const testInputContent = register("content", {
    required: "Content required",
    minLength: {
      value: 5,
      message: "Please enter a longer content",
    },
    maxLength: {
      value: 100,
      message: "Please enter a shorter content",
    },
  });

  const testInputCategory = register("category", {
    required: "category required",
  });

  if (data.showModal === "modalDeleteArticle") {
    choiceModal = (
      <Dialog
        open={data.display}
        TransitionComponent={Transition}
        keepMounted
        onClose={data.closeModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bi bi-exclamation-lg material-icons"> </i>
                </div>
                <h4 className="modal-title">Are you sure?</h4>
              </div>
              <div className="modal-body">
                <p>
                  Do you really want to delete article <br></br>
                  <b> {data.blog.title}</b>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={data.closeModal}
                  type="button"
                  className="btn btn-info"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={data.deleteBlog}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else if (data.showModal === "modalUpdateArticle") {
    choiceModal = (
      <Dialog
        fullWidth
        open={data.display}
        TransitionComponent={Transition}
        keepMounted
        onClose={data.closeModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="update-article ">
                <form className="update-form" onSubmit={handleSubmit(onSubmit)}>
                  <h3>Update Article</h3>
                  <TextField
                    className="input-field"
                    size="medium"
                    placeholder="Title of article"
                    label="Title of article"
                    variant="outlined"
                    name="Title"
                    {...testInputTitle}
                    onChange={(e) => {
                      testInputTitle.onChange(e);
                      setTitle(e.target.value);
                    }}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    value={title}
                  />

                  <TextField
                    className="input-field"
                    multiline
                    rows={4}
                    placeholder="Content of article"
                    size="medium"
                    label="Content of article"
                    variant="outlined"
                    name="Content"
                    error={Boolean(errors.content)}
                    helperText={errors.content?.message}
                    value={content}
                    {...testInputContent}
                    onChange={(e) => {
                      testInputContent.onChange(e);
                      setContent(e.target.value);
                    }}
                  />
                  <FormControl>
                    <InputLabel id="demo-simple-select-error-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      label="Category"
                      control={control}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      {...testInputCategory}
                      value={category}
                      onChange={(e) => {
                        testInputCategory.onChange(e);
                        setCategory(e.target.value);
                      }}
                    >
                      {categoryInfo &&
                        categoryInfo.categories.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.category}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <button
                    onClick={data.closeModal}
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-update">
                    Update
                  </button>

                  <p>{updateArticleInfo}</p>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return <div>{choiceModal}</div>;
};

export default ModalAlert;
