import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useForm, Controller } from "react-hook-form";
import decodeTokens from "../../helpers/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  updateClient,
  resetStateRemoveClient,
} from "../store/actions/clientActions";
import "./modalAlert.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalClient = (data) => {
  const updateClientInfo = useSelector(
    (state) => state.client.updateClientInfo
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let choiceModal = data.showModal;
  let displayUi;
  const dispatch = useDispatch();

  const onSubmit = (item, e) => {
    let newUpdate = {
      email: item.email,
      newPassword: item.newPassword,
    };

    dispatch(updateClient(newUpdate, data.user.id));

    data.updateData({
      email: item.email,
      id: data.user.id,
    });
    setTimeout(() => {
      data.closeModal();
    }, 2000);
  };
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

  const testInputEmail = register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "invalid email address",
    },
  });

  const testInputPassword = register("newPassword", {
    required: "Password required",
    minLength: {
      value: 8,
      message: "Minimum cartere 8 ",
    },
  });
  // Initial all filed with default data passed in props (default data is empty object)
  useEffect(() => {
    setEmail(data.user.email);
  }, [data.user.email]);

  const modal = () => {
    if (choiceModal === "modalDeleteClientByAdmin") {
      displayUi = (
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
                    Do you really want to delete article
                    <b>{data.user.client}</b>
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
                    onClick={data.deleteClient}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {/* <DialogContentText id="alert-dialog-slide-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are running.
                  ====Title Here=====
                  {data.blog.title}
                </DialogContentText> */}
          </DialogContent>
          {/* <DialogActions>
                <Button onClick={data.closeModal}>Yes</Button>
                <Button onClick={data.closeModal}>No</Button>
              </DialogActions> */}
        </Dialog>
      );
    } else if (choiceModal === "modalUpdateClientByAdmin") {
      displayUi = (
        <Dialog
          fullWidth
          open={data.display}
          TransitionComponent={Transition}
          keepMounted
          onClose={data.closeModal}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}

          <DialogContent>
            <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                <div className="update-article ">
                  <form
                    className="update-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h3>Update Client : {data.user.email}</h3>
                    <TextField
                      className="input-field"
                      size="medium"
                      placeholder="Email of user"
                      label="Email of user"
                      variant="outlined"
                      name="email"
                      {...testInputEmail}
                      onChange={(e) => {
                        testInputEmail.onChange(e);
                        setEmail(e.target.value);
                      }}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      value={email}
                    />
                    <TextField
                      className="input-field"
                      size="medium"
                      placeholder="New Password"
                      label="New password of client"
                      variant="outlined"
                      type="password"
                      name="newPassword"
                      {...testInputPassword}
                      onChange={(e) => {
                        testInputPassword.onChange(e);
                        setPassword(e.target.value);
                      }}
                      error={Boolean(errors.newPassword)}
                      helperText={errors.newPassword?.message}
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

                    <p>{updateClientInfo}</p>

                    {/* <img
                          rel="image_src"
                          src={`http://localhost:4000/${currentlyUser.path}/${data.blog.picture}`}
                        /> */}
                  </form>
                </div>
              </div>
            </div>
            {/* <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are running.
                    ====Title Here=====
                    {data.blog.title}
                  </DialogContentText> */}
          </DialogContent>
          {/* <DialogActions>
                  <Button onClick={data.closeModal}>Yes</Button>
                  <Button onClick={data.closeModal}>No</Button>
                </DialogActions> */}
        </Dialog>
      );
    }
    return displayUi;
  };
  const modalUi = modal();

  return <div>{modalUi}</div>;
};

export default ModalClient;
