import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import { SET_ORDERS } from "../../redux/reducers/highlightReducer";

import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  // Alert,
  Stack,
  // Snackbar,
  Button,
} from "@mui/material";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../redux/actions/orderAction";
import MUIDataTable from "mui-datatables";

import { Container } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/navbar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { baseUrl, origin } from "../../urls";
// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";

// const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
//   return <Alert severity="success" elevation={6} ref={ref} {...props} />;
// });

function OrdersList() {
  const toggle = () => {
    setState((prev) => !prev);
  };
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
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
  const { isDeleted, reset } = useSelector((state) => state.deleteOrder);
  const { user } = useSelector((state) => state.auth);
  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  const [orderId, setOrderId] = useState();
  const [orders, setOrders] = useState();

  // const [open, setOpen] = useState(false);
  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.allOrders);
  // const { deleting, isDeleted } = useSelector((state) => state.deleteBook);


  useEffect(() => {
    fetch(`${origin}/${baseUrl}/orders?user=${user.id}&order=all`)
    .then(response => {
      if (response.status === 400 || response.status === 200) return response.json()
    }).then(data => {
      if (data.success) {
        setOrders(data.detail)
        // setLoading(false)
      }
    })
  }, [])

  // useEffect(() => {
  //   dispatch(allOrders());

  //   if (error) {
  //     console.log(error);
  //     dispatch(clearErrors());
  //   }
  //   if (isDeleted) {
  //     console.log("deleted");
  //   }
  // }, [dispatch, error, isDeleted]);

  // useEffect(() => {
  //   dispatch({ type: SET_ORDERS });
  // }, [dispatch]);
  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = ["Product name", "Quantity", "Amount", "Status", "Actions"];
  const data = [];
  orders &&
    orders.map((order) =>
      data.push([
        order.product_name,
        order.quantity,

        <span style={{ color: "green" }}>&#8358; {numberWithCommas(parseFloat(order.price))}</span>,

        <p style={{ color: order.active ? ( order.success ? "green" : "red" ) : "gray" }}>{ 
          order.active ? (order.success ? "Delivered" : "Pending") : "Cancelled" 
        }</p>,

        <>
          { order.active && !order.success ? <Link to={`/admin/order/${order.id}`}>
            <IconButton sx={{ "&:focus": { outline: "none" } }}>
              <EditIcon color="primary" />
            </IconButton>
          </Link> : <></> }
          {/* {user && user.role === "admin" && (
            <IconButton
              color="error"
              sx={{ "&:focus": { outline: "none" } }}
              onClick={() => {
                setOrderId(order._id);
                handleOpenM();
              }}
            >
              <DeleteIcon />
            </IconButton>
          )} */}
        </>,
      ])
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
                    Orders
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "auto",
                    overflowX: "scroll",
                  }}
                >
                  {" "}
                  <>
                    {loading ? (
                      <Container
                        fixed
                        sx={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress color="warning" size="small" />
                      </Container>
                    ) : (
                      <>
                        <Box
                          sx={{
                            width: "auto",
                            overflowX: "scroll",
                            padding: "10px",
                          }}
                        >
                          <MUIDataTable
                            title={"Order List"}
                            data={data}
                            columns={columns}
                            options={options}
                          />
                        </Box>

                        {/* <Snackbar
                  open={isDeleted}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar> */}
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
                              Delete Order
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Are you sure you wan't to delete this order?
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
                                  handleDelete(orderId);
                                  setOpenM(false);
                                }}
                              >
                                Yes
                              </Button>
                            </Stack>
                          </Box>
                        </Modal>
                      </>
                    )}
                  </>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
      </Box>
      <SidebarDrawer open={open} close={handleDrawerClose} />
    </>
  );
}

export default OrdersList;
