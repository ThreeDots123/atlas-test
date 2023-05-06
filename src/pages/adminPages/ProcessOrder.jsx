import React, { useEffect, useState, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import Sidebar from "../../components/navbar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";
import {
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Stack,
  Box,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import {
  updateOrder,
  getOrderDetails,
  clearErrors,
} from "../../redux/actions/orderAction";
import { LoadingButton } from "@mui/lab";
import { SET_ORDERS } from "../../redux/reducers/highlightReducer";
import BrandId from "./brandId";
import { baseUrl, origin } from "../../urls";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function ProcessOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order ? order.orderStatus : "");

  const { error, isUpdated } = useSelector((state) => state.order);
  // useEffect(() => {

  // }, [dispatch, id]);
  const { user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(getOrderDetails(id));

  //   if (error) {
  //     console.log(error);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     setOpen(true);
  //   }
  // }, [error, isUpdated, dispatch, navigate, id]);

  let shippingInfo;
  let orderItems;
  let paymentInfo;
  let orderStatus;
  let itemsPrice;

  if (order) {
    shippingInfo = order.shippingInfo;
    orderItems = order.orderItems;
    paymentInfo = order.paymentInfo;
    orderStatus = order.orderStatus;
    itemsPrice = order.itemsPrice;
  }

  // const { user: me } = useSelector((state) => state.auth);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   dispatch({ type: SET_ORDERS });
  // }, [dispatch]);
  // const toggle = () => {
  //   setState((prev) => !prev);
  // };
  // const updateOrderHandler = (id) => {
  //   const formData = new FormData();
  //   formData.set("status", status);

  //   dispatch(updateOrder(id, formData));
  // };

  useEffect(() => {
    fetch(`${origin}/${baseUrl}/orders/${id}`)
    .then(response => {
      return response.json()
    }).then(data => {
      if(data.success) {
        setOrder(data.detail)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }, [])

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}, ${shippingInfo.campus}`;

  // const orderStatusHandler = (e) => {
  //   setStatus(e.target.value);
  // };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateOrderHandler = (e, id) => {
    setUpdating(true)
    e.target.disabled = true
    
    fetch(`${origin}/${baseUrl}/orders/${id}?type=update`, {
      method: "PUT",
      body: JSON.stringify({user: user.id}),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      if (response.status === 200) {
        setUpdated(true)
        setUpdating(false)
      } else {
        e.target.disabled = false
        setUpdating(false)
      }
    })
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          height: " 100%",
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
              height: "100vh",
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
                    // onClick={toggle}
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
                    Process Order
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginTop: { md: "", sm: "10px", xs: "10px" },
                    padding: { md: "15px", sm: "0px", xs: "0px" },
                    width: { md: "98%", ms: "100%", xs: "100%" },
                    display: { md: "flex", sm: "flex", xs: "flex" },
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
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
                      <Stack
                        direction={{ md: "row", sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Box sx={{ width: { md: "49%", xs: "100%" } }}>
                          <Typography variant="h5">
                            Order ID : {order.id}
                          </Typography>
                          <Stack
                            direction="column"
                            spacing={0.5}
                            sx={{
                              marginTop: "15px",
                              padding: "10px",
                              boxShadow: 5,
                            }}
                          >
                            <Typography variant="h5">Shipping Info</Typography>
                            <Typography>
                              <b>Name: </b> {order.name}
                            </Typography>
                            <Typography>
                              <b>phone: </b>{" "}
                              {order.phone}
                            </Typography>
                            <Typography>
                              <b>Address: </b>
                              {`${order.primary_loc} ${order.city}, ${order.state}`}
                            </Typography>
                            <Typography>
                              <b>Amount:</b> &#8358; { numberWithCommas(parseFloat(order.price)) }
                            </Typography>

                            <Divider />

                            <Typography>
                              <b> Payment : </b>
                                { order.payment_status ? <Typography
                                sx={{
                                  display: "inline-block",
                                  padding: "5px 15px",
                                  fontSize: "0.8em",
                                  borderRadius: "15px",
                                  color: "white",
                                  background: "#87d287",
                                }}
                              >
                                Paid
                              </Typography> : <Typography
                                sx={{
                                  display: "inline-block",
                                  padding: "5px 15px",
                                  color: "white",
                                  fontSize: "0.8em",
                                  borderRadius: "15px",
                                  background: "#f3855a",
                                }}
                              >
                                On Delivery
                              </Typography> }
                            </Typography>

                            <Typography>
                              <b> Reference ID :</b>
                              {paymentInfo && paymentInfo.id}
                            </Typography>

                            <Typography>
                              <b>Order Status: </b>
                              {orderStatus && orderStatus === "success" && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#87d287",
                                  }}
                                >
                                  {orderStatus && orderStatus}
                                </Typography>
                              )}
                              {orderStatus && orderStatus !== "success" && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#f3855a",
                                  }}
                                >
                                  {orderStatus && orderStatus}
                                </Typography>
                              )}
                            </Typography>

                            <Divider />
                            <Typography variant="h5">Order Items:</Typography>

                            <Box>
                              {orderItems &&
                                orderItems.map((item) => (
                                  <>
                                    {user.role === "seller" &&
                                    user._id === item.seller ? (
                                      <Stack
                                        key={item.product}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{
                                          padding: "10px 10px",
                                          overflowX: "scroll",
                                        }}
                                      >
                                        {" "}
                                        <Avatar
                                          src={item.image}
                                          alt={item.name}
                                        />
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            navigate`/product/${item.product}`()
                                          }
                                        >
                                          {item.name}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          &#8358;{item.price}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          {`${item.quantity} Piece(s)`}
                                        </Typography>
                                      </Stack>
                                    ) : (
                                      <Stack
                                        key={item.product}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{
                                          padding: "10px 10px",
                                          overflowX: "scroll",
                                        }}
                                      >
                                        {" "}
                                        <Avatar
                                          src={item.image}
                                          alt={item.name}
                                        />
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            navigate`/product/${item.product}`()
                                          }
                                        >
                                          {item.name}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          &#8358;{item.price}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          {`${item.quantity} Piece(s)`}
                                        </Typography>
                                        <BrandId id={item.seller} />
                                      </Stack>
                                    )}
                                    <Divider />
                                  </>
                                ))}
                            </Box>
                            <hr />
                          </Stack>
                        </Box>
                        <Box
                          sx={{
                            width: { md: "49%", xs: "100%" },
                          }}
                        >
                          <Typography variant="h5">update Order</Typography>
                          <Box
                            sx={{
                              marginTop: "15px",
                              padding: "10px",
                              boxShadow: 5,
                            }}
                          >
                            <Typography>Status</Typography>

                            <div className="form-group">
                              <select
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                {
                                  order.success ? <option value="Delivered">Delivered</option> : <>
                                    <option value="Update To Delivered">Update To Delivered</option>
                                  </>
                                }
                              </select>
                            </div>

                            <Stack>
                              <LoadingButton
                                disabled={order.success || updated}
                                id="login_button"
                                type="submit"
                                color="primary"
                                variant="contained"
                                loading={updating ? true : false}
                                sx={{ "&:focus": { outline: "none" }, marginTop: "20px" }}
                                onClick={e => updateOrderHandler(e, order.id)}
                              >
                                { updated ? "Updated" : "UPDATE ORDER" }
                              </LoadingButton>

                              <Snackbar
                                open={open}
                                autoHideDuration={4000}
                                onClose={handleClose}
                              >
                                <SnackbarAlert>
                                  <Typography>updated</Typography>
                                </SnackbarAlert>
                              </Snackbar>
                            </Stack>
                          </Box>
                        </Box>
                      </Stack>
                    )}
                  </>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default ProcessOrder;
