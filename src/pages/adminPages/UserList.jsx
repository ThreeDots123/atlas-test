import React, { useEffect, useState, forwardRef } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  Alert,
  Snackbar,
  Stack,
  Button,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import ArticleIcon from "@mui/icons-material/Article";
import { SET_USER_LIST } from "../../redux/reducers/highlightReducer";
import { useNavigate } from "react-router-dom";

import {
  allUsers,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import { baseUrl, origin } from "../../urls";
// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function UserList() {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggle = () => {
    setState((prev) => !prev);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, md: 400 },
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate()

  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);

  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  // const [open, setOpen] = useState(false);
  // const [bookId, setBookId] = useState();
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  // const { loading, error, products } = useSelector(
  //   (state) => state.allProducts
  // );
  // const { isDeleted, reset, deleting } = useSelector(
  //   (state) => state.deleteProduct
  // );
  // const { users } = useSelector((state) => state.allUsers);
  // const { reset } = useSelector((state) => state.DeleteUser);

  // useEffect(() => {
  //   dispatch(allUsers());

  //   // if (deleteError) {
  //   //   alert(deleteError);
  //   // }
  // }, [dispatch, reset]);
  // useEffect(() => {
  //   dispatch({ type: SET_USER_LIST });
  // }, [dispatch]);

  useEffect(() => {
    if(user.role === "admin") {
      fetch(`${origin}/${baseUrl}/accounts/user/all`).then(response => {
        if(response.status === 400 || response.status === 200) return response.json()
        else throw new Error("Something went wrong")
      })
      .then(data => {
        if (data.success === true) {
          setUsers(data.detail)
        }
      })
    } else {
      navigate("/")
    }
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  function parseUserRole(role) {
    if (role === "T") return "user"
    else if (role === "A") return "admin"
    else if (role === "S") return "Seller"
  }

  const columns = ["User Id", "Name", "Email", "Role"];
  const data = [];
  users &&
    users.map((user) =>
      data.push([user.id, `${user.first_name} ${user.last_name}`, user.email, parseUserRole(user.role)])
    );

  const options = {
    filterType: "checkbox",
    responsive: "standard",
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
          height: "100vh",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "inherit",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: "0.1px solid #d9d3d3",
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
            <Sidebar />
          </Box>

          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", padding: "0" }}>
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "block", ms: "none", xs: "none" },
                    }}
                    onClick={toggle}
                  >
                    {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                  </IconButton>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "none", sm: "block", xs: "block" },
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "1.2em" }} />
                  </IconButton>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                    All Users
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    overflowX: "scroll",
                    brderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <MUIDataTable
                    title={"User List"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Box>

                <Snackbar
                  open={false}
                  autoHideDuration={4000}
                  // onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar>
                <Modal
                  open={openM}
                  onClose={handleCloseM}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Book
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you wan't to delete this User?
                    </Typography>
                    <Stack>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => setOpenM(false)}
                      >
                        cancel
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          handleDelete(userId);
                          setOpenM(false);
                        }}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default UserList;
