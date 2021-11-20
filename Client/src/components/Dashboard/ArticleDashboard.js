import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { listArticlePerPage } from "../store/actions/articleActions";

import "./articleDashbord.css";
const useStyles = makeStyles({
  tableArticle: {
    "&.MuiDataGrid-root": {
      marginTop: "150%",
    },
  },
});

const columns = [
  // { field: "id", headerName: "ID", width: 400 },
  { field: "title", headerName: "Title", width: 400 },
  { field: "category", headerName: "Category", width: 400 },
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
          //  onClick={() => {
          //    setOpen(true);
          //    setArticle({ title: params.row.title, id: params.row.id });
          //    setDisplayModal("modalDeleteArticle");
          //  }}
          //   index={params.row.id}
          />
          <EditIcon
          //  onClick={() => {
          //    setOpen(true);
          //    setArticle({
          //      id: params.row.id,
          //      title: params.row.title,
          //      content: params.row.content,
          //      category: params.row.category,
          //      picture: params.row.picture,
          //    });
          //    setDisplayModal("modalUpdateArticle");
          //  }}
          //  index={params.row.id}
          />
        </div>
      );
    },
  },
];

const ArticleDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listOfArticlePerPage = useSelector(
    (state) => state.blog.listArticlePerPage
  );

  const [pageValue, setPageValue] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [numberRows, setNumberRows] = useState(0);

  let rows = [];
  //   useEffect(() => {
  //     dispatch(listArticlePerPage(pageValue));
  //   }, []);

  // First call api
  useEffect(() => {
    console.log("fire page value", pageValue);
    dispatch(listArticlePerPage(pageValue));
  }, [pageValue]);

  // Wait reponse from api
  useEffect(() => {
    listOfBlogs();
  }, [listOfArticlePerPage]);

  const handleChangePage = (e) => {
    if (e === 0) {
      setPageValue(1);
    } else {
      setPageValue(e + 1);
    }
  };

  const listOfBlogs = () => {
    listOfArticlePerPage &&
      listOfArticlePerPage.articles.map((item) => {
        rows.push({
          id: item._id,
          title: item.title,
          content: item.content,
          category: item.category,
          picture: item.picture,
          comment: item.comments.length,
          vote: item.vote,
          createAt: item.createAt,
        });
      });
    // TableData : the new array
    setTableData(rows);
    setNumberRows(
      listOfArticlePerPage && listOfArticlePerPage.numberOfArticles
    );
    // OldTable : the old array
    // setOldTable(rows);
  };
  console.log("tab", tableData);
  return (
    <div className="table-article" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        onPageChange={handleChangePage}
        checkboxSelection
        rowCount={numberRows}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default ArticleDashboard;
