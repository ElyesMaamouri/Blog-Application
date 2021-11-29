import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getListCategories } from "../store/actions/categoryActions";
import ModalCategory from "../Modal/ModalCategory";
import "./articleDashbord.css";
const useStyles = makeStyles({
  iconCreate: {
    marginLeft: "460px",
    position: "relative",
    top: "136px",
    cursor: "pointer",
  },
});
const CategoryDashbord = () => {
  const columns = [
    { field: "category", headerName: "Category", width: 250 },
    { field: "createAt", headerName: "Create At", width: 250 },
    {
      field: "articles",
      headerName: "Articles",
      width: 150, // Nested array
      valueGetter: (params) => {
        let result = [];
        if (params.row.articles) {
          result.push(params.row.articles.length);
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
            //   onClick={() => {
            //     setOpenModal(true);
            //     setUser({ client: params.row.userName, id: params.row._id });
            //     setDisplayModal("modalDeleteClientByAdmin");
            //   }}
            //   index={params.row.id}
            />
            <EditIcon
              onClick={() => {
                setOpenModal(true);
                setCategory({
                  id: params.row._id,
                  category: params.row.category,
                });
                setDisplayModal("modalUpdateCategoryByAdmin");
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
  const listOfCategories = useSelector(
    (state) => state.category.listCategoriesInfo
  );
  const createCategoryInfo = useSelector(
    (state) => state.category.createCategoryInfo
  );
  const [displayModal, setDisplayModal] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState({});
  console.log("gategory List ==>", listOfCategories);
  useEffect(() => {
    dispatch(getListCategories(1));
  }, []);
  //wait response from api
  useEffect(() => {
    listOfCategories && setRows(listOfCategories[0].categories);
  }, [listOfCategories]);
  useEffect(() => {
    if (createCategoryInfo === "Category has been successfully created")
      dispatch(getListCategories(1));
  }, [createCategoryInfo]);

  // Pagination in table
  const handleChangePage = (e) => {
    dispatch(getListCategories(e + 1));
  };
  const handleCreateCategory = (e) => {
    console.log("handel click catgeory");
    setOpenModal(true);
    setDisplayModal("modalCreateCategoryByAdmin");
  };

  // Update data in row without call api
  const updateData = (item) => {
    let idRow = item.id;
    const selectedCategory = item.category;
    const tt = (rows.filter((x) => {
      return x._id === idRow;
    })[0].category = selectedCategory);
  };
  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <AddCircleOutlineIcon
        onClick={handleCreateCategory}
        className={classes.iconCreate}
        fontSize="large"
      />
      <p className={classes.iconCreate}> Create Category</p>
      <DataGrid
        className="table-article"
        style={{ height: "500px" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        onPageChange={handleChangePage}
        // id of rows
        rowCount={listOfCategories ? listOfCategories[0].numberOfCategories : 0}
        getRowId={(row) => row._id}
        paginationMode="server"
      />

      <ModalCategory
        display={openModal}
        category={category}
        closeModal={handleCloseModal}
        // deleteBlog={deleteArticle}
        showModal={displayModal}
        updateData={updateData}
      />
    </div>
  );
};

export default CategoryDashbord;
