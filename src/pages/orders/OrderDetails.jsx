import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Stack,
  Divider,
  Switch,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { baseUrl, origin } from "../../urls";
function OrderDetails() {
  const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  const { error } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.auth);
  const [ loading, setLoading ] = useState(true)
  const [ order, setOrder ] = useState(null)
  const [ cancelling, setCancelling ] = useState(false)
  const { id } = useParams();

  const [navbar, setNavbar] = useState(true);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

  const payment = true

  function handleCancel(e) {
    setCancelling(true)
    e.target.disabled = true
    
    fetch(`${origin}/${baseUrl}/orders/${id}?type=cancel`, {
      method: "PUT",
      body: JSON.stringify({user: user.id}),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      if (response.status === 200) {
        e.target.innerText = "This Order Has Been Cancelled"
        e.target.disabled = true
      } else {
        e.target.disabled = false
        setCancelling(false)
      }
    })
  }

  return (
    <Box sx={{ background: "white" }}>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        active="active2"
        background="white"
        border={true}
      />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "100px", xs: "65px" },
          paddingBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              <CircularProgress />
            </Container>
          ) : <>
            { !order ? <Typography sx={{
                width: "100%",
                marginTop: "15vh",
                marginButtom: "15vh",
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "800",
              }}
            >
              This Order Doesn't Exist
            </Typography> : <Stack justifyContent="space-between" sx={{ width: "100%" }}>
              {" "}
              {order && (
                <Stack sx={{padding: { md: "0 20px" }}} spacing={2} direction="column">
                  <Typography variant="h5">
                    Order ID : {order.id}
                  </Typography>
                  <Divider />
                  <Typography variant="h5">Shipping Info</Typography>
                  <Typography>
                    <b>Name:</b> {order.name}
                  </Typography>
                  <Typography>
                    <b>Phone:</b> {order.phone}
                  </Typography>
                  <Typography>
                    <b>Address:</b>
                    {` ${order.primary_loc} ${order.city}, ${order.state}`}
                  </Typography>
                  <Typography>
                    <b>Amount: </b>
                    &#8358;
                    {numberWithCommas(parseFloat(order.price))}
                  </Typography>

                  <Divider />

                  <Typography>
                    <b>Payment: </b>
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
                    <b>Order Status: </b>
                    {order.success && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px 15px",
                          fontSize: "0.8em",
                          color: "white",
                          borderRadius: "15px",
                          background: "#87d287",
                        }}
                      >
                        Delivered
                      </Typography>
                    )}
                    {!order.success && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px 15px",
                          fontSize: "0.8em",
                          color: "white",
                          borderRadius: "15px",
                          background: "#f3855a",
                        }}
                      >
                        Processing
                      </Typography>
                    )}
                  </Typography>
                  <Divider />

                  <div className="cart-item my-1" style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                  }}>
                      <h4>Cancel Order</h4>
                      <Button 
                        sx={{
                          marginTop: "3px"
                        }}
                        onClick={handleCancel} 
                        disabled={!order.active}
                      >
                        { cancelling ? <CircularProgress size={15} /> : (order.active ? "Cancel Order" : "This Order Has Been Cancelled") }
                      </Button>
                  </div>
                </Stack>
              )}
              {error && <Box sx={{ merginTop: "20vh" }}>{errorMessage}</Box>}
            </Stack>}
          </>}
        </>
      </Box>
    </Box>
  );
}

export default OrderDetails;
