import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
export default function NotFound() {
  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { md: "60%", xs: "98%" },
          padding: "10px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
                    <h1>Oops! You seem to be lost.</h1>
                    <p>Here are some helpful links:</p>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
      </Box>
              
    </Box>
  );
}
