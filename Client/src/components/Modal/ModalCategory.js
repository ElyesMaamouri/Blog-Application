import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useForm, Controller } from "react-hook-form";
import decodeTokens from "../../helpers/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../store/actions/categoryActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "./modalAlert.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalCategory = (data) => {
  const [category, setCategory] = useState();
  const createCategoryInfo = useSelector(
    (state) => state.category.createCategoryInfo
  );
  const updateCategoryInfo = useSelector(
    (state) => state.category.updateCategoryInfo
  );

  let choiceModal = data.showModal;
  let displayUi;
  const dispatch = useDispatch();
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
    setCategory(data.category.category);
  }, [data.category.category]);
  console.log("object", category);
  const testInputCategory = register("category", {
    required: "Category name required",
    minLength: {
      value: 3,
      message: "Please enter a longer categroy name",
    },
    maxLength: {
      value: 10,
      message: "Please enter a shorter categroy name",
    },
  });
  const onSubmit = (item, e) => {
    if (choiceModal === "modalCreateCategoryByAdmin") {
      dispatch(createCategory(item));
      setTimeout(() => {
        data.closeModal();
      }, 3000);
    } else if (choiceModal === "modalUpdateCategoryByAdmin") {
      let idCategory = data.category.id;
      dispatch(updateCategory(item, idCategory));
      data.updateData({
        category: item.category,
        id: data.category.id,
      });
      setTimeout(() => {
        data.closeModal();
      }, 3000);
    }
  };

  const modal = () => {
    if (choiceModal === "modalCreateCategoryByAdmin") {
      displayUi = (
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
                  <form
                    className="update-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h3>Create gategory</h3>
                    <TextField
                      className="input-field"
                      size="medium"
                      placeholder="Add catgeory"
                      label="Catgeory"
                      variant="outlined"
                      name="category"
                      {...testInputCategory}
                      onChange={(e) => {
                        testInputCategory.onChange(e);
                        setCategory(e.target.value);
                      }}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      value={category}
                    />
                    <button
                      onClick={data.closeModal}
                      type="button"
                      className="btn btn-info"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-update">
                      Create
                    </button>
                    <p>{createCategoryInfo}</p>
                  </form>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    } else if (choiceModal === "modalUpdateCategoryByAdmin") {
      displayUi = (
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
                  <form
                    className="update-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h3>Update gategory</h3>
                    <TextField
                      className="input-field"
                      size="medium"
                      placeholder="Add catgeory"
                      label="Catgeory"
                      variant="outlined"
                      name="category"
                      {...testInputCategory}
                      onChange={(e) => {
                        testInputCategory.onChange(e);
                        setCategory(e.target.value);
                      }}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      // value={data.category.category}
                    />
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
                    <p>{updateCategoryInfo}</p>
                  </form>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
    return displayUi;
  };
  let modalUi = modal();
  return <div>{modalUi}</div>;
};

export default ModalCategory;
