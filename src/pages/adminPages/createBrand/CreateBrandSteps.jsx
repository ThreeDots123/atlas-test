import { Typography, LinearProgress, Box } from "@mui/material";
import React from "react";
function CreateBrandSteps({
  fistStep,
  brandName,
  brandType,
  brandDetails,
  location,
  personal,
}) {
  return (
    <>
      <Box>
        {fistStep && (
          <LinearProgress variant="determinate" value={10} color="primary" />
        )}
        {brandName && (
          <LinearProgress variant="determinate" value={20} color="primary" />
        )}
        {brandType && (
          <LinearProgress variant="determinate" value={60} color="primary" />
        )}
        {brandDetails && (
          <LinearProgress variant="determinate" value={20} color="primary" />
        )}
        {location && (
          <LinearProgress variant="determinate" value={80} color="primary" />
        )}
        {personal && (
          <LinearProgress variant="determinate" value={100} color="primary" />
        )}
      </Box>
      {fistStep && (
        <Box sx={{ margin: "25px 0px" }}>
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: "550",
              fontSize: "1.1em",
            }}
          >
            Lets get started. Which of these best describes you?
          </Typography>
          <Typography
            sx={{
              fontWeight: "50",
              margin: "0",
              padding: "0",
            }}
          >
            We will help you setup based on your bussiness needs
          </Typography>
        </Box>
      )}
      {brandName && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Brand Name
          <p style={{ fontWeight: "50", fontSize: "15px" }}>
            Lets get started. Choose a unique name that best describes your
            brand
          </p>
        </Typography>
      )}
      {brandType && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Brand Type
          <p style={{ fontWeight: "50", fontSize: "15px" }}>
            what is your plan for selling( typically asking about your physical
            store )
          </p>
        </Typography>
      )}
      {brandDetails && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Brand Description
          <p style={{ fontWeight: "50", fontSize: "15px" }}>
            Write a brief description of what your brand is about
          </p>
        </Typography>
      )}
      {location && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Brand Location
          <p style={{ fontWeight: "50", fontSize: "15px" }}>
            Your brand location will help us locate customers around you
          </p>
        </Typography>
      )}
      {personal && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Personal Information
          <p style={{ fontWeight: "50", fontSize: "15px" }}>
            We need these personal information for payment when an order have
            been placed in your brand{" "}
          </p>
        </Typography>
      )}
    </>
  );
}

export default CreateBrandSteps;
