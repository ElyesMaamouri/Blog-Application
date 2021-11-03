import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticle, deleteBlog } from "../store/actions/articleActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ModalAlert from "../Modal/ModalAlert";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import "./listArticle.css";

const useStyles = makeStyles({
  inputSearch: {
    "&.MuiFormControl-root": {
      paddingBottom: 10,
      width: "100%",
    },
  },
});

const ListeArticle = () => {
  const classes = useStyles();
  const columns = [
    // { field: "id", headerName: "ID", width: 400 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "comment", headerName: "Comments", width: 150 },
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
                setOpen(true);
                setArticle({ title: params.row.title, id: params.row.id });
                setDisplayModal("modalDeleteArticle");
              }}
              index={params.row.id}
            />
            <EditIcon
              onClick={() => {
                setOpen(true);
                setArticle({
                  id: params.row.id,
                  title: params.row.title,
                  content: params.row.content,
                  category: params.row.category,
                  picture: params.row.picture,
                });
                setDisplayModal("modalUpdateArticle");
              }}
              index={params.row.id}
            />
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const listArticleInfo = useSelector((state) => state.blog.listArticleInfo);
  const deleteArticleInfo = useSelector(
    (state) => state.blog.deleteArticleInfo
  );
  const [open, setOpen] = useState(false);
  const [displayModal, setDisplayModal] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [article, setArticle] = useState({});
  const [blog, setBlog] = useState();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [oldTable, setOldTable] = useState([]);
  // Position Snackbar
  const vertical = "top";
  const horizontal = "left";
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  let rows = [];

  // Get data from api
  useEffect(() => {
    dispatch(listArticle());
  }, []);

  // Show snackbar if article has been successfully removed
  useEffect(() => {
    if (deleteArticleInfo === "Article has been successfully removed") {
      setOpenSnackbar(true);
      setBlog("");
    }
  }, [blog, deleteArticleInfo]);

  // Wait reponse from api
  useEffect(() => {
    listOfBlogs();
  }, [listArticleInfo]);

  // Set search value
  useEffect(() => {
    filtered(searchValue);
  }, [searchValue]);

  // Push and map data from response api
  const listOfBlogs = () => {
    listArticleInfo &&
      listArticleInfo.blogs.map((item) => {
        rows.push({
          id: item._id,
          title: item.title,
          content: item.content,
          category: item.category,
          picture: item.picture,
          comment: item.comments.length,
          vote: item.vote,
        });
      });
    // TableData : the new array
    setTableData(rows);
    // OldTable : the old array
    setOldTable(rows);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setBlog(deleteArticleInfo);
  };
  // Get id of row and remove article
  const deleteArticle = () => {
    let id = article.id;
    let articleRemoved = tableData.filter((item) => {
      return item.id !== id;
    });
    dispatch(deleteBlog(article.id));
    setTableData(articleRemoved);
    handleClose();
  };

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Get value from field input search
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter old array and set the new table in ui
  const filtered = (e) => {
    const filtered =
      oldTable &&
      oldTable.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(e.toString().toLowerCase()) > -1
        );
      });
    setTableData(filtered);
  };
  const updateData = (item) => {
    let idRow = item.id;
    const tt = (tableData.filter((x) => {
      return x.id === idRow;
    })[0].title = item.title);
  };

  return (
    <div className="section-article">
      <TextField
        onChange={handleChange}
        label="Search"
        size="medium"
        name="Search"
        variant="outlined"
        value={searchValue}
        className={classes.inputSearch}
      />
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <div>
        <ModalAlert
          display={open}
          blog={article}
          closeModal={handleClose}
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

export default ListeArticle;
