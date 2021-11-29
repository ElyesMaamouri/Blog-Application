import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  displayCommentsPerPage,
  removeComment,
  resetStateComment,
} from "../store/actions/commentActions";
import ModalDeleteComment from "../Modal/ModalDeleteComment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles({
  tableArticle: {
    "&.MuiDataGrid-root": {
      marginTop: "150%",
    },
  },
});

const CommentDashbord = () => {
  const vertical = "top";
  const horizontal = "left";
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const columns = [
    // { field: "id", headerName: "ID", width: 400 },
    { field: "content", headerName: "Comment", width: 400 },
    { field: "createAt", headerName: "CreateAt", width: 400 },
    {
      field: "author",
      headerName: "By user",
      width: 400,
      // Nested array
      valueGetter: (params) => {
        let result = [];
        if (params.row.author.userName) {
          result.push(params.row.author.userName);
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-center  align-items-center"
            style={{ cursor: "pointer", border: "2px solid black" }}
          >
            <DeleteIcon
              onClick={() => {
                setOpenModal(true);
                setComment({ content: params.row.content, id: params.row._id });
                setDisplayModal("modalDeleteCommentByAdmin");
              }}
              index={params.row.id}
            />
          </div>
        );
      },
    },
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [comment, setComment] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [displayModal, setDisplayModal] = useState();
  const [openModal, setOpenModal] = useState(false);
  const displayComments = useSelector(
    (state) => state.comment.listCommentsPerPage
  );
  const deleteCommentInfo = useSelector(
    (state) => state.comment.removeCommentInfo
  );

  // First call api
  useEffect(() => {
    dispatch(displayCommentsPerPage(1));
  }, []);

  // Refresh array after delete comment
  useEffect(() => {
    dispatch(displayCommentsPerPage(1));
  }, [deleteCommentInfo]);

  // Wait reponse from api
  useEffect(() => {
    displayComments && setRows(displayComments.comments);
  }, [displayComments]);

  // Show snackbar if comment has been successfully removed
  useEffect(() => {
    if (deleteCommentInfo === "Comment has been deleted admin") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetStateComment());
      }, 3000);
    }
    if (deleteCommentInfo === "Admin Token is not valid.") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetStateComment());
      }, 3000);
    }
  }, [deleteCommentInfo]);

  // Pagination in table
  const handleChangePage = (e) => {
    dispatch(displayCommentsPerPage(e + 1));
  };
  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    // setBlog(deleteArticleInfo);
  };

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  //  Get id of row and remove comment
  const deleteComment = () => {
    let id = comment.id;
    let commentRemoved = rows.filter((item) => {
      return item._id !== id;
    });
    dispatch(removeComment(comment.id));
    setRows(commentRemoved);
    handleCloseModal();
  };
  return (
    <div className="table-article">
      <DataGrid
        style={{ height: "500px" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        onPageChange={handleChangePage}
        // id of rows
        rowCount={displayComments ? displayComments.numberOfComments : 0}
        getRowId={(row) => row._id}
        paginationMode="server"
      />
      <div>
        <ModalDeleteComment
          display={openModal}
          removeComment={comment}
          closeModal={handleCloseModal}
          deleteComment={deleteComment}
          showModal={displayModal}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          {deleteCommentInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CommentDashbord;
