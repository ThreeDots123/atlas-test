import React, { useState } from "react";
import CheckOutSteps from "./checkOutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Paper, Stack, Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Footer from "../../components/footer/Footer";
function ConfirmOrder() {
  const [navbar, setNavbar] = useState(true);

  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //calculate order prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 10000 ? 0 : 500;

  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = Math.trunc(
    (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  );
  const processToPayment = async () => {
    const cost = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingInfo,
      taxPrice,
      totalPrice,
      shippingPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(cost));

    const transactionData = {
      email: user.email,
      amount: totalPrice,
      phone: shippingInfo.phoneNumber,
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice,
    };
    try {
      //initializing the transaction
      const { data } = await axios.post(
        "/api/v1/payment/process",
        transactionData,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      window.location.replace(data.data.authorization_url);
    } catch (error) {
      console.log(error);
      navigate("/payment");
    }
  };
  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active" />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "auto",
          paddingTop: { md: "100px", xs: "60px" },
          paddingBottom: "20px",
        }}
      >
        <Paper
          sx={{
            marginTop: "20px",
            width: { md: "50%", xs: "90%" },
            padding: "20px",
            boxShadow: 2,
            borderRadius: "15px",
          }}
        >
          <Stack>
            <CheckOutSteps confirmOrder />
          </Stack>

          <Box sx={{ padding: "15px" }}>
            <Stack direction="column" spacing={5}>
              <Box sx={{ padding: "10px" }}>
                <h3
                  style={{
                    width: "auto",
                    paddingLeft: "6px",

                    borderLeft: "10px solid rgb(24, 104, 183)",
                    borderBottom: "0.1px solid rgb(24, 104, 183)",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  Shipping Info
                </h3>
                <p>
                  <b>Name:</b> {user && user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNumber}
                </p>
                <p className="mb-4">
                  <b>Address:</b>{" "}
                  {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.campus}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                </p>

                <hr />
                <h3
                  style={{
                    width: "auto",
                    paddingLeft: "6px",

                    borderLeft: "10px solid rgb(24, 104, 183)",
                    borderBottom: "0.1px solid rgb(24, 104, 183)",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  Your Cart items
                </h3>

                {cartItems.map((item) => (
                  <Box key={item.book}>
                    <hr />
                    <div className="cart-item my-1">
                      <div className="row">
                        <div className="col-4 col-lg-2">
                          <Avatar
                            alt={item.name}
                            src={item.image}
                            sx={{ width: 100, height: 100 }}
                          />
                        </div>

                        <div className="col-5 col-lg-6">
                          <Link tp={`/book/${item.book}`}>{item.name}</Link>
                        </div>

                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                          <p>
                            {item.quantity} x{" "}
                            <span style={{ color: "green" }}>&#8358;</span>
                            {item.price} ={" "}
                            <b>
                              {" "}
                              <span style={{ color: "green" }}>&#8358;</span>
                              {item.quantity * item.price}
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Box>
                ))}
              </Box>

              <Box sx={{ padding: "10px" }}>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {" "}
                    <span style={{ color: "green" }}>&#8358;</span>
                    {itemsPrice}
                  </span>
                </p>
                <p>
                  Shipping:{" "}
                  <span className="order-summary-values">
                    {" "}
                    <span style={{ color: "green" }}>&#8358;</span>
                    {shippingPrice}
                  </span>
                </p>
                <p>
                  Tax:{" "}
                  <span className="order-summary-values">
                    {" "}
                    <span style={{ color: "green" }}>&#8358;</span>
                    {taxPrice}
                  </span>
                </p>

                <hr />

                <p>
                  Total:{" "}
                  <span className="order-summary-values">
                    {" "}
                    <span style={{ color: "green" }}>&#8358;</span>
                    {totalPrice}
                  </span>
                </p>

                <hr />
                {/* <button
                  onClick={processToPayment}
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                >
                  Proceed to Payment
                </button> */}
                <Stack>
                  <Button
                    onClick={processToPayment}
                    color="primary"
                    type="submit"
                    variant="contained"
                    sx={{
                      "&:focus": { outline: "none" },
                    }}
                  >
                    Proceed to Payment
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default ConfirmOrder;
