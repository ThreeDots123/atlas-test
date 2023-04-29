import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CreateBrandSteps from "./CreateBrandSteps";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { saveBrandInfo } from "../../../redux/actions/brandAction";
import "../../../app.scss";
function BrandType() {
  const [navbar, setNavbar] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createBrandInfo } = useSelector((state) => state.createBrand);
  const [selectedValue, setSelectedValue] = React.useState(
    createBrandInfo.brandType
  );
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const data = localStorage.getItem("createBrandInfo");
  const { brandName, brandDetail } = JSON.parse(data);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveBrandInfo({
        brandName,
        brandDetail,
        brandType: selectedValue,
      })
    );
    navigate("/brandLocation");
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
    color: "secondary",
  });
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
          height: "90vh",
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
            <CreateBrandSteps brandType />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px 0px",
              }}
            >
              <div className="parent" style={{ width: "100%" }}>
                <div className="div1">
                  <FormControlLabel
                    value="Plug"
                    control={<Radio {...controlProps("Plug")} />}
                    label="Plug"
                  />
                </div>
                <div className="div2">
                  {" "}
                  <FormControlLabel
                    value="Store"
                    control={<Radio {...controlProps("Store")} />}
                    label="Store"
                  />
                </div>
                <div className="div3">
                  {" "}
                  <FormControlLabel
                    value="Mall"
                    control={<Radio {...controlProps("Mall")} />}
                    label="Mall"
                  />
                </div>
                <div className="div4">
                  {" "}
                  <FormControlLabel
                    value="Restaurants"
                    control={<Radio {...controlProps("Restaurants")} />}
                    label="Restaurants"
                  />
                </div>
              </div>
            </Box>
          </div>
          <Stack
            alignItems="flex-end"
            justifyContent="space-between"
            direction="row"
            sx={{ padding: "0px 20px" }}
          >
            <Button
              onClick={() => navigate("/brandDetails")}
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

export default BrandType;
