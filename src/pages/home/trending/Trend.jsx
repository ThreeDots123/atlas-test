import React from "react";
import { Avatar, Box, Stack, Typography, ListItem } from "@mui/material";
function Trend({ data }) {
  return (
    <>
      <ListItem
        sx={{
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Avatar
                alt="seller"
                src={data.images[0].url}
                sx={{ width: 75, height: 75, borderRadius: "20px" }}
              />

              <Typography
                sx={{
                  marginLeft: "25px",
                  fontWeight: "600",
                  justifySelf: "self-start",
                }}
              >
                {data.name}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Typography sx={{ fontWeight: "25px" }}>
                {data.category}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </ListItem>
    </>
  );
}

export default Trend;
