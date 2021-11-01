import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import "./modalAlert.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalAlert = (data) => {
  return (
    <div>
      <Dialog
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
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bi bi-exclamation-lg material-icons"> </i>
                </div>
                <h4 className="modal-title">Are you sure?</h4>
              </div>
              <div className="modal-body">
                <p>
                  Do you really want to delete these records? This process
                  cannot be undone.
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
    </div>
  );
};

export default ModalAlert;
