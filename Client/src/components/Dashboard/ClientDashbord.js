import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getListClient,
  removeClient,
  resetStateRemoveClient,
} from "../store/actions/clientActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ModalClient from "../Modal/ModalClient";
const useStyles = makeStyles({
  tableArticle: {
    "&.MuiDataGrid-root": {
      marginTop: "50%",
    },
  },
});
const ClientDashbord = () => {
  // Position Snackbar
  const vertical = "top";
  const horizontal = "left";
  //   Snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const columns = [
    { field: "userName", headerName: "Client", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "blogs",
      headerName: "Articles",
      width: 150, // Nested array
      valueGetter: (params) => {
        let result = [];
        if (params.row.blogs) {
          result.push(params.row.blogs.length);
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    { field: "createAt", headerName: "createAt", width: 350 },
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
                setUser({ client: params.row.userName, id: params.row._id });
                setDisplayModal("modalDeleteClientByAdmin");
              }}
              index={params.row.id}
            />
            <EditIcon
              onClick={() => {
                setOpenModal(true);
                setUser({
                  id: params.row._id,
                  email: params.row.email,
                });
                setDisplayModal("modalUpdateClientByAdmin");
              }}
              index={params.row.id}
            />
          </div>
        );
      },
    },
  ];

  const listOfUser = useSelector((state) => state.client.listClientInfo);
  const removeClientInfo = useSelector(
    (state) => state.client.removeClientInfo
  );
  console.log("listOfUser", listOfUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [displayModal, setDisplayModal] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // First call api
  useEffect(() => {
    dispatch(getListClient(1));
  }, []);

  //wait response from api
  useEffect(() => {
    listOfUser && setRows(listOfUser.users);
  }, [listOfUser]);

  // Show snackbar if article has been successfully removed + reset state
  useEffect(() => {
    if (removeClientInfo === "Account client has been successfully removed") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetStateRemoveClient());
      }, 3000);
    }
  }, [removeClientInfo]);

  // Pagination in table
  const handleChangePage = (e) => {
    dispatch(getListClient(e + 1));
  };
  //Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    //setBlog(deleteArticleInfo);
  };
  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  // Get id of row and remove article from table
  const deleteClient = () => {
    let id = user.id;
    let userRemoved = rows.filter((item) => {
      return item._id !== id;
    });
    dispatch(removeClient(user.id));
    setRows(userRemoved);
    handleCloseModal();
  };
  // Update data in row without call api
  const updateData = (item) => {
    let idRow = item.id;
    const emailUser = item.email;
    const tt = (rows.filter((x) => {
      return x._id === idRow;
    })[0].email = emailUser);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <DataGrid
        style={{ height: "500px" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        onPageChange={handleChangePage}
        // id of rows
        rowCount={listOfUser ? listOfUser.numberOfClients : 0}
        getRowId={(row) => row._id}
        paginationMode="server"
      />
      <div>
        <ModalClient
          display={openModal}
          user={user}
          closeModal={handleCloseModal}
          deleteClient={deleteClient}
          showModal={displayModal}
          updateData={updateData}
        />
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
            {removeClientInfo}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ClientDashbord;
