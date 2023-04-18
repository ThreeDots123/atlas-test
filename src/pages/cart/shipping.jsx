import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import {
  Box,
  Button,
  Stack,
  Paper,
  Divider,
  FormControl,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CheckOutSteps from "./checkOutSteps";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { states } from "../../utils/stateData";
function Shipping() {
  const [navbar, setNavbar] = useState(true);

  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate("/confirm");
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
          <div style={{ margin: "0", padding: "0" }}>
            <CheckOutSteps shipping />
            <Stack
              direction="column"
              sx={{ padding: "5px", marginTop: "15px" }}
            >
              <FormControl onSubmit={submitHandler} sx={{ padding: "8px" }}>
                <Typography sx={{ fontSize: "1.5em", padding: "10px 0px" }}>
                  Shipping Info
                </Typography>
                <Divider />
                <Stack direction="column" spacing={2}>
                  <TextField
                    label="Address"
                    type="text"
                    name="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  {/* <div className="form-group">
                  <label htmlFor="address_field">Address</label>
                  <input
                    type="text"
                    id="address_field"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div> */}

                  {/* <div className="form-group">
                  <label htmlFor="city_field">City</label>
                  <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div> */}
                  {/* <TextField
                  label="city"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                /> */}
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

                  {/* <div className="form-group">
                    <label htmlFor="phone_field">Phone No</label>
                    <input
                      type="phone"
                      id="phone_field"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPoneNumber(e.target.value)}
                      required
                    />
                  </div> */}
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

                  {/* <div className="form-group">
                    <label htmlFor="postal_code_field">Postal Code</label>
                    <input
                      type="number"
                      id="postal_code_field"
                      className="form-control"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div> */}

                  {/* <div className="form-group">
                    <label htmlFor="postal_code_field">Street</label>
                    <input
                      type="text"
                      id="campus_field"
                      className="form-control"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      required
                    />
                  </div> */}

                  <TextField
                    label="Street"
                    type="text"
                    name="Street"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    required
                  />

                  {/* <div className="form-group">
                    <label htmlFor="country_field">Country</label>
                    <select
                      id="country_field"
                      className="form-control"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
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
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "8px 0px",
                  }}
                >
                  <Button
                    onClick={submitHandler}
                    color="primary"
                    type="submit"
                    variant="contained"
                    sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
                  >
                    CONTINUE
                  </Button>
                </Stack>
              </FormControl>
            </Stack>
          </div>
        </Paper>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default Shipping;
