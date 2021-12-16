import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
//import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticlePerPage,
  removeArticleByAdmin,
} from "../store/actions/articleActions";
import ModalAlertAdmin from "../Modal/ModalAlertAdmin";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./articleDashbord.css";
// const useStyles = makeStyles({
//   tableArticle: {
//     "&.MuiDataGrid-root": {
//       marginTop: "150%",
//     },
//   },
// });

const ArticleDashboard = () => {
  // Position Snackbar
  const vertical = "top";
  const horizontal = "left";
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const columns = [
    { field: "title", headerName: "Title", width: 400 },
    { field: "createAt", headerName: "CreateAt", width: 400 },
    { field: "comments", headerName: "Comments", width: 150 },
    { field: "vote", headerName: "Vote", width: 150 },
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

                console.log("article details", article);
                setArticle({ title: params.row.title, id: params.row._id });
                setDisplayModal("modalDeleteArticleByAdmin");
              }}
              index={params.row.id}
            />
            <EditIcon
              onClick={() => {
                setOpenModal(true);
                setArticle({
                  id: params.row._id,
                  title: params.row.title,
                  content: params.row.content,
                  comments: params.row.comments,
                  picture: params.row.picture,
                });
                setDisplayModal("modalUpdateArticleByAdmin");
              }}
              index={params.row.id}
            />
          </div>
        );
      },
    },
  ];
  // const classes = useStyles();
  const dispatch = useDispatch();
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );
  const deleteArticleInfo = useSelector(
    (state) => state.blog.deleteArticleInfo
  );

  const [rows, setRows] = useState([]);
  const [article, setArticle] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [blog, setBlog] = useState();
  const [displayModal, setDisplayModal] = useState();
  const [openModal, setOpenModal] = useState(false);

  // First call api
  useEffect(() => {
    dispatch(listArticlePerPage(1));
  }, [dispatch]);

  // Refresh array after delete article
  useEffect(() => {
    dispatch(listArticlePerPage(1));
  }, [deleteArticleInfo, dispatch]);

  // Wait reponse from api
  useEffect(() => {
    listOfArticlePerPage && setRows(listOfArticlePerPage.articles);
  }, [listOfArticlePerPage]);

  // Show snackbar if article has been successfully removed
  useEffect(() => {
    if (deleteArticleInfo === "Article has been deleted admin") {
      setOpenSnackbar(true);
      setBlog("");
    }
  }, [blog, deleteArticleInfo]);

  // Pagination in table
  const handleChangePage = (e) => {
    dispatch(listArticlePerPage(e + 1));
  };
  // Update data in row without call api
  const updateData = (item) => {
    let idRow = item._id;
    rows.filter((x) => {
      return x.id === idRow;
    })[0].title = item.title;
  };

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setBlog(deleteArticleInfo);
  };

  // Get id of row and remove article from table
  const deleteArticle = () => {
    let id = article.id;
    let articleRemoved = rows.filter((item) => {
      return item._id !== id;
    });
    dispatch(removeArticleByAdmin(article.id));
    setRows(articleRemoved);
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
        rowCount={
          listOfArticlePerPage ? listOfArticlePerPage.numberOfArticles : 0
        }
        getRowId={(row) => row._id}
        paginationMode="server"
      />
      <div>
        <ModalAlertAdmin
          display={openModal}
          blog={article}
          closeModal={handleCloseModal}
          deleteBlog={deleteArticle}
          showModal={displayModal}
          updateData={updateData}
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
          {deleteArticleInfo}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ArticleDashboard;
