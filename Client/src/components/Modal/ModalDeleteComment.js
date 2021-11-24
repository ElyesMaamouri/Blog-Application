import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import "./modalAlert.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalDeleteComment = (data) => {
  return (
    <div>
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
                  Do you really want to delete comment
                  <b>{data.removeComment.content}</b>
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
                  onClick={data.deleteComment}
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
    </div>
  );
};

export default ModalDeleteComment;
