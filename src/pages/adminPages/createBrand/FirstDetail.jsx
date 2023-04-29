import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CreateBrandSteps from "./CreateBrandSteps";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
// import { saveBrandInfo } from "../../../redux/actions/brandAction";
function FirstDetaili() {
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

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
          paddingTop: { md: "100px", xs: "80px" },
          paddingBottom: "20px",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            marginTop: "20px",
            width: { md: "50%", xs: "90%" },
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Box style={{ margin: "0", padding: "20px" }}>
            <Typography
              sx={{ fontWeight: "800", margin: "9px 0px", fontSize: "1.2em" }}
            >
              Atlas
            </Typography>
            <CreateBrandSteps fistStep />
            <Stack
              direction={{ md: "row", sm: "row", xs: "column" }}
              sx={{
                width: "100%",
                margin: { md: "0px", sm: "0px", xs: "7px 0px" },
                padding: "0px",
              }}
              justifyContent="space-between"
            >
              <FormControlLabel
                sx={{
                  padding: "8px",
                  margin: { md: "0px", sm: "0px", xs: "7px 0px" },
                  border: "0.2px solid grey",
                  width: { md: "46%", xs: "100%" },
                }}
                control={<Checkbox checked={state} name="checkedA" />}
                label="I'm just starting"
              />
              <FormControlLabel
                sx={{
                  padding: "8px",
                  margin: "0px",
                  border: "0.2px solid grey",
                  width: { md: "46%", xs: "100%" },
                }}
                control={<Checkbox checked={state} name="checkedA" />}
                label="I'm already selleing online or in person"
              />
            </Stack>
          </Box>
          <Stack
            alignItems="flex-end"
            justifyContent="flex-end"
            direction="row"
            sx={{ padding: "0px 20px" }}
          >
            <Button
              onClick={() => navigate("/brandName")}
              color="primary"
              type="submit"
              variant="contained"
              sx={{ "&:focus": { outline: "none" }, width: "30%" }}
            >
              Next
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default FirstDetaili;
