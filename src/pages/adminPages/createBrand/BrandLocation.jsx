import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Paper,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CreateBrandSteps from "./CreateBrandSteps";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { saveBrandInfo } from "../../../redux/actions/brandAction";
import { states } from "../../../utils/stateData";

function BrandLocation() {
  const [navbar, setNavbar] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createBrandInfo } = useSelector((state) => state.createBrand);
  const [location, setBrandLocation] = useState(createBrandInfo.location);
  const data = localStorage.getItem("createBrandInfo");
  const { brandName, brandDetail, brandType } = JSON.parse(data);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveBrandInfo({
        brandName,
        brandDetail,
        brandType,
        location,
      })
    );
    navigate("/personal");
  };
  return (
    <Box sx={{ background: "white" }}>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        active="active"
        background="white"
        border={true}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "60vh",
          paddingTop: { md: "100px", xs: "60px" },
          paddingBottom: "20px",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            marginTop: "20px",
            width: { md: "40%", xs: "90%" },
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <div style={{ margin: "0", padding: "0" }}>
            <Typography
              sx={{ fontWeight: "800", margin: "9px 0px", fontSize: "1.2em" }}
            >
              Atlas
            </Typography>
            <CreateBrandSteps location />
            <Stack
              direction="column"
              sx={{ padding: "5px", marginTop: "15px" }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  name="location"
                  onChange={(e) => setBrandLocation(e.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </div>

          <Stack
            alignItems="flex-end"
            justifyContent="space-between"
            direction="row"
            sx={{ padding: "0px 20px" }}
          >
            <Button
              onClick={() => navigate("/brandType")}
              color="primary"
              type="submit"
              variant="outlined"
              sx={{
                "&:focus": { outline: "none" },
                width: "30%",
                fontSize: { md: "1em", xs: "0.6em" },
              }}
            >
              Previous
            </Button>
            <Button
              onClick={submitHandler}
              color="primary"
              type="submit"
              variant="contained"
              sx={{
                "&:focus": { outline: "none" },
                width: "30%",
                fontSize: { md: "1em", xs: "0.6em" },
              }}
            >
              Next
            </Button>
          </Stack>
        </Paper>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </Box>
  );
}

export default BrandLocation;
