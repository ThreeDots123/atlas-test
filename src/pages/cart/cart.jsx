import React, { useState } from "react";
import {
  Typography,
  ButtonGroup,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromcart,
} from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [navbar, setNavbar] = useState(true);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty >= stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 1) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeCartHandler = (id) => {
    dispatch(removeItemFromcart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />

      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "72px", xs: "50px" },
          backgroundColor: "white",
          paddingBottom: "20px",
        }}
      >
        {cartItems.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
              margin: "0 !important",
              padding: "0 !important",
            }}
          >
            <Typography
              sx={{
                width: "90%",
                fontWeight: "900",
                fontSize: { md: "5em", sm: "4em", xs: "2em" },
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Your Cart is Empty
            </Typography>
            <IconButton sx={{ border: "1px solid" }}>
              <ProductionQuantityLimitsIcon
                sx={{
                  fontWeight: "900",
                  fontSize: "5em",
                  padding: "15px",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => navigate("/products")}
              />
            </IconButton>
          </Box>
        ) : (
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={8}
            sx={{ padding: { md: "60px 20px", xs: "50px 0px" } }}
            justifyContent="space-between"
          >
            <Box
              sx={{
                width: { md: "60%", xs: "auto%" },
                padding: "10px",
                overflowX: "scroll",
              }}
              boxShadow={2}
            >
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
                CART ITEMS -{" "}
                <span style={{ fontSize: "20px", fontWeight: "100" }}>
                  {cartItems.length === 1
                    ? `${cartItems.length} item`
                    : `${cartItems.length} items`}
                </span>
              </h3>
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody className="align-middle">
                  {cartItems.map((item) => (
                    <tr key={item.product}>
                      <td className="align-middle">
                        <Link to={`/product/${item.product}`}>
                          <Avatar alt={item.name} src={item.image} />
                        </Link>
                        <Box
                          sx={{
                            display: "flex",
                            color: "black",
                            fontWeight: "400",
                          }}
                        >
                          <Typography>{item.name}</Typography>
                        </Box>
                      </td>
                      <td className="align-middle">
                        <span style={{ color: "green" }}>&#8358;</span>
                        {item.price}
                      </td>
                      <td className="align-middle">
                        <ButtonGroup
                          variant="contained"
                          orientation="horizontal"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: 0,
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              decreaseQty(item.product, item.quantity);
                            }}
                            color="secondary"
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="h4"
                            sx={{
                              textAlign: "center",
                              verticalAlign: "center",
                              padding: "4px",
                              border: "0.1px solid gray",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() => {
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              );
                            }}
                            color="warning"
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            <AddIcon />
                          </IconButton>
                        </ButtonGroup>
                      </td>
                      <td className="align-middle">
                        <span style={{ color: "green" }}>&#8358;</span>
                        {item.price * item.quantity}
                      </td>
                      <td className="align-middle">
                        <IconButton
                          onClick={() => removeCartHandler(item.product)}
                          color="error"
                          sx={{ "&:focus": { outline: "none" } }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Box
              sx={{ width: { md: "30%", xs: "auto" }, padding: "10px" }}
              boxShadow={2}
            >
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
                CART SUMMARY
              </h3>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (units)
                    </h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>
                      <span style={{ color: "green" }}>&#8358;</span>
                      {cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}
                    </h5>
                  </div>
                  <Stack>
                    <LoadingButton
                      onClick={checkOutHandler}
                      variant="contained"
                      // loading={sending ? true : false}
                      sx={{
                        "&:focus": { outline: "none" },
                        background: "rgb(24, 104, 183)",
                      }}
                    >
                      Proceed To Checkout
                    </LoadingButton>
                  </Stack>
                </div>
              </div>
            </Box>
          </Stack>
        )}
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default Cart;
