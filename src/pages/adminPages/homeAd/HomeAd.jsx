import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function HomeAd() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: "#0b8669",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "60%",
            width: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            paddingTop: "25px",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              color: "white",
              fontWieght: "900",
              fontSize: "1.6em",
              textAlign: "center",
            }}
          >
            Atlas
          </Typography>
          <Typography
            sx={{
              width: "100%",
              fontWieght: "900",
              fontSize: { md: "3em", xs: "2em" },
              color: "white",
              padding: "5px",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            Visualizing your store
          </Typography>
          <Typography
            sx={{
              marginBottom: "10px",
              width: "100%",
              fontWieght: "100",
              textAlign: "center",
              color: "white",
              padding: "5px",
            }}
          >
            Imagining of different stores (A perfect design of different store
            logo){" "}
          </Typography>
          <Button
            sx={{
              "&:focus": { outline: "none" },
              "&:hover": { background: "#394047" },
              color: "white",
              background: "#181717",
              margin: "5px",
            }}
            size="large"
            onClick={() => navigate("/firstDetails")}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: "white",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          sx={{ border: "1px solid", width: "100%" }}
          pt={5}
          px={3}
        >
          <Box sx={{ border: "1px solid black", width: "30%" }}>
            <Typography>
              virtualize your store by just creating a profile
            </Typography>
            <Typography>
              Choose from over 70 professional free store template, customize
              colors, imagery, and font with ease. No design skill required
            </Typography>
          </Box>
          <Box sx={{ border: "1px solid black", width: "30%" }}>
            <Typography>
              virtualize your store by just creating a profile
            </Typography>
            <Typography>
              Choose from over 70 professional free store template, customize
              colors, imagery, and font with ease. No design skill required
            </Typography>
          </Box>
          <Box sx={{ border: "1px solid black", width: "30%" }}>
            <Typography>
              virtualize your store by just creating a profile
            </Typography>
            <Typography>
              Choose from over 70 professional free store template, customize
              colors, imagery, and font with ease. No design skill required
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
