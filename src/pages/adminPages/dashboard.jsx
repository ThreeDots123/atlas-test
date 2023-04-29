import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/navbar/Sidebar";
import "../../app.scss";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { SET_DASHBOARD } from "../../redux/reducers/highlightReducer";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";

import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../redux/actions/orderAction";
import { allUsers } from "../../redux/actions/userActions";
import MUIDataTable from "mui-datatables";
// import { allUsers } from "../../../redux/actions/userActions";
import { adminGetProducts } from "../../redux/actions/productAction";
import { baseUrl, origin } from "../../urls";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 200, md: 400 },
  bgcolor: "background.paper",
  border: "2px solid green",
  borderRadius: "10px",
  // boxShadow: 24,
  p: 4,
};
function Dashboard() {
  const dispatch = useDispatch();

  const [state, setState] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const { loading, error, totalAmount } = useSelector(
    (state) => state.allOrders
  );
  const { products } = useSelector((state) => state.allProducts);
  const { isDeleted, reset } = useSelector((state) => state.deleteOrder);
  const { user } = useSelector((state) => state.auth);
  // const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) outOfStock += 1;
    });

    
  useEffect(() => {
    fetch(`${origin}/${baseUrl}/orders?user=${user.id}&order=pending`)
    .then(response => {
      if (response.status === 400 || response.status === 200) return response.json()
    }).then(data => {
      if (data.success) {
        setOrders(data.detail)
        // setLoading(false)
      }
    })
  }, [])


  const days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
  ]
  
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  // useEffect(() => {
  //   dispatch({ type: SET_DASHBOARD });
  // }, [dispatch]);
  // useEffect(() => {
  //   if (error) {
  //     dispatch(clearErrors());
  //   }
  //   if (isDeleted) {
  //   }
  // }, [dispatch, error, isDeleted]);
  // useEffect(() => {
  //   dispatch(adminGetProducts());
  //   dispatch(allOrders());
  //   dispatch(allUsers());
  // }, [dispatch]);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };
  const toggle = () => {
    setState((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const columns = ["Product name", "Quantity", "Amount", "Payment Status","Date created", "Actions"];
  const data = [];
  orders &&
    orders.map((order) => {
      let date = new Date(order.date_created)
      date = `${days[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      return data.push([
        order.product_name,
        order.quantity,
        <span style={{ color: "green" }}>&#8358; {numberWithCommas(parseFloat(order.price))}</span>,
        ( order.payment_status ? <span style={{ color: "green" }}>Paid</span> : <span style={{ color: "gray" }}>On Delivery</span>),
        date,
        <>
          <Link to={`/admin/order/${order.id}`}>
            <IconButton sx={{ "&:focus": { outline: "none" } }}>
              <EditIcon color="primary" />
            </IconButton>
          </Link>
          {/* {user.role === "admin" && (
            <IconButton
              color="error"
              sx={{ "&:focus": { outline: "none" } }}
              onClick={() => {
                setOrderId(order.id);
                handleOpenM();
              }}
            >
              <DeleteIcon />
            </IconButton>
          )} */}
        </>,
      ])}
    );

  const options = {
    filterType: "checkbox",
    responsive: "standard",
  };
  return (
    <Box sx={{ background: "white" }}>
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
                  Dashboard
                </Typography>
              </Box>
              <Stack
                spacing={2}
                direction={{ md: "row", sm: "row", xs: "column" }}
                sx={{
                  marginTop: { md: "", sm: "10px", xs: "10px" },
                  padding: { md: "15px", sm: "0px", xs: "0px" },
                  width: { md: "98%", ms: "100%", xs: "100%" },
                  display: { md: "flex", sm: "flex", xs: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    background: "#2eb8f6",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "50",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Total Amount
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccountBalanceWalletIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "200",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        &#8358;{totalAmount}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    background: "#f62e4d",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "20",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Orders
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "200",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {orders && orders.length}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    background: "#28df93",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "20",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Products
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocalMallIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "200",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {products && <b>{products.length}</b>}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    background: "#cb28df",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "20",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Out of Stock
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ProductionQuantityLimitsIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "200",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {outOfStock}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {user && user.role === "admin" && (
                  <Box
                    sx={{
                      width: { md: "25%", sm: "90%", xs: "90%" },
                      height: { md: "150px", sm: "200px", xs: "200px" },
                      borderRadius: "10px",
                      background: "#cc9900",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "50",
                        fontSize: "1.3em",
                        color: "white",
                        padding: "3px",
                      }}
                    >
                      Users
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        padding: "10px 10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SupervisedUserCircleIcon
                        sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "200",
                            fontSize: "1.3em",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* {users && users.length} */}
                          {"data"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Stack>

              <Box sx={{ padding: { md: "12px", xs: "" } }}>
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
                        padding: "12px",
                      }}
                    >
                      <MUIDataTable
                        title={"Pending Orders"}
                        data={data}
                        columns={columns}
                        options={options}
                        component={Box}
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
              </Box>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </Box>
  );
}
export default Dashboard;
