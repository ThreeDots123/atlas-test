import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addItemToCart, removeItemFromcart } from "../redux/actions/cartAction";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { countries } from "countries-list";
import { states } from "../utils/stateData";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
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
    setShipping(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //shipping
  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
  const [phoneNumber, setPoneNumber] = useState(shippingInfo?.phoneNumber);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [campus, setCampus] = useState(shippingInfo?.campus);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        postalCode,
        phoneNumber,
        country,
        campus,
      })
    );
    setConfirm(true);
    setShipping(false);
  };

  //confirm
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
      localStorage.removeItem("cartItems");
      window.location.replace(data.data.authorization_url);
    } catch (error) {
      navigate("/home");
    }
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          margin: "10px 20px",
          width: { md: "30%", xs: "90%" },
          height: "95vh",
          borderRadius: "15px",
        },
        className: "cartmain",
      }}
    >
      {!shipping && !confirm && (
        <Box sx={{ padding: "10px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              alignItems: "center",
              padding: "5px 0px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "1.4em" }}>
              Your Cart
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ "&:focus": { outline: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ marginTop: "10px" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              alignItems: "center",
              padding: "5px 0px",
            }}
          >
            <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
              {cartItems.length === 1
                ? `${cartItems.length} item`
                : `${cartItems.length} items`}
            </Typography>
            <Typography
              sx={{ fontWeight: "500", fontSize: "1.1em", cursor: "pointer" }}
            ></Typography>
          </Stack>

          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 !important",
                padding: "0 !important",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  width: "90%",
                  fontWeight: "3em",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Your Cart is Empty
              </Typography>
              <IconButton
                sx={{ border: "1px solid", "&:focus": { outline: "none" } }}
              >
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
            <>
              <List>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.product}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => removeCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={item.name}
                        src={item.image}
                        sx={{
                          borderRadius: "6px",
                          height: "60px",
                          width: "60px",
                          marginRight: "5px",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <>
                          <span style={{ color: "grey" }}>&#8358;</span>
                          {numberWithCommas(Number(item.price))}
                        </>
                      }
                    />
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
                          increaseQty(item.product, item.quantity, item.stock);
                        }}
                        color="warning"
                        sx={{ "&:focus": { outline: "none" } }}
                      >
                        <AddIcon />
                      </IconButton>
                    </ButtonGroup>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginTop: "10px" }} />

              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
                  Cart Summary
                </Typography>
                <div className="bg-light p-30 mb-5">
                  <div className="border-bottom pb-2">
                    <div className="d-flex justify-content-between mb-3">
                      <Typography variant="h6">Subtotal</Typography>
                      <Typography variant="h6">
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.quantity),
                          0
                        )}{" "}
                        (units)
                      </Typography>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="d-flex justify-content-between mt-2">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" sx={{ fontWeight: "700" }}>
                        <span style={{ color: "gray" }}>&#8358;</span>
                        {numberWithCommas(
                          Number(
                            cartItems.reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                            )
                          )
                        )}
                      </Typography>
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
            </>
          )}
        </Box>
      )}
      {shipping && (
        <Stack direction="column" sx={{ padding: "5px", marginTop: "15px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              alignItems: "center",
              padding: "5px 0px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "1.4em" }}>
              Shipping Info
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ "&:focus": { outline: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ marginTop: "10px" }} />{" "}
          <FormControl onSubmit={submitHandler} sx={{ padding: "8px" }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Address"
                type="text"
                name="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Age"
                  name="location"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="phone"
                type="phone"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPoneNumber(e.target.value)}
                required
              />
              <TextField
                label="Postal Code"
                type="number"
                name="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />

              <TextField
                label="Street"
                type="text"
                name="Street"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                required
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  name="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countriesList.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={submitHandler}
                color="primary"
                type="submit"
                variant="contained"
                sx={{ "&:focus": { outline: "none" }, width: "100%" }}
              >
                CONTINUE
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      )}
      {confirm && (
        <Box sx={{ padding: "15px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              alignItems: "center",
              padding: "5px 0px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "1.4em" }}>
              Confirm Order
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ "&:focus": { outline: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ marginTop: "10px" }} />{" "}
          <Stack direction="column" spacing={5}>
            <Box sx={{ padding: "10px" }}>
              <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
                Shipping Info
              </Typography>
              <Divider />
              <Typography>
                <b>Name:</b> {user && user.name}
              </Typography>
              <Typography>
                <b>Phone:</b> {shippingInfo.phoneNumber}
              </Typography>
              <Typography className="mb-4">
                <b>Address:</b>{" "}
                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.campus}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
              </Typography>

              <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
                Your Cart items
              </Typography>
              <Divider />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {cartItems.map((item) => (
                  <ListItem
                    key={item.book}
                    sx={{ paddingLeft: "0px !important" }}
                  >
                    <ListItemAvatar sx={{ marginRight: "5px" }}>
                      <Avatar
                        alt={item.name}
                        src={item.image}
                        sx={{ width: 100, height: 100, borderRadius: "12px" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <p>
                          {item.quantity} x{" "}
                          <span style={{ color: "gray" }}>&#8358;</span>
                          {numberWithCommas(Number(item.price))} ={" "}
                          <b>
                            {" "}
                            <span style={{ color: "gray" }}>&#8358;</span>
                            {numberWithCommas(
                              Number(item.quantity * item.price)
                            )}
                          </b>
                        </p>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ padding: "10px" }}>
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "gray" }}>&#8358;</span>
                  {numberWithCommas(Number(itemsPrice))}
                </span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "gray" }}>&#8358;</span>
                  {numberWithCommas(Number(shippingPrice))}
                </span>
              </p>
              <p>
                Tax:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "gray" }}>&#8358;</span>
                  {numberWithCommas(Number(taxPrice))}
                </span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "gray" }}>&#8358;</span>
                  {numberWithCommas(Number(totalPrice))}
                </span>
              </p>

              <hr />

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
      )}
    </Drawer>
  );
};

export default Cart;
