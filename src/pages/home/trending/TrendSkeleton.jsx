import React from "react";
import { Box, Stack, Skeleton, ListItem, List } from "@mui/material";
function TrendSkeleton() {
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
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Skeleton
                variant="rectangle"
                sx={{ minWidth: 75, height: 75, borderRadius: "20px" }}
              />
              <Skeleton
                variant="rectangle"
                sx={{
                  marginLeft: "25px",
                  minHeight: "15px",
                  minWidth: "100px",
                  borderRadius: "20px",
                }}
              />
            </Box>

            <Skeleton
              variant="rectangle"
              sx={{
                padding: "0 10px",
                minHeight: "15px",
                minWidth: { md: "100px", xs: "60px" },
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      </ListItem>

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
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Skeleton
                variant="rectangle"
                sx={{ minWidth: 75, height: 75, borderRadius: "20px" }}
              />
              <Skeleton
                variant="rectangle"
                sx={{
                  marginLeft: "25px",
                  minHeight: "15px",
                  minWidth: "100px",
                  borderRadius: "20px",
                }}
              />
            </Box>

            <Skeleton
              variant="rectangle"
              sx={{
                padding: "0 10px",
                minHeight: "15px",
                minWidth: { md: "100px", xs: "60px" },
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      </ListItem>

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
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Skeleton
                variant="rectangle"
                sx={{ minWidth: 75, height: 75, borderRadius: "20px" }}
              />
              <Skeleton
                variant="rectangle"
                sx={{
                  marginLeft: "25px",
                  minHeight: "15px",
                  minWidth: "100px",
                  borderRadius: "20px",
                }}
              />
            </Box>

            <Skeleton
              variant="rectangle"
              sx={{
                padding: "0 10px",
                minHeight: "15px",
                minWidth: { md: "100px", xs: "60px" },
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      </ListItem>

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
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Skeleton
                variant="rectangle"
                sx={{ minWidth: 75, height: 75, borderRadius: "20px" }}
              />
              <Skeleton
                variant="rectangle"
                sx={{
                  marginLeft: "25px",
                  minHeight: "15px",
                  minWidth: "100px",
                  borderRadius: "20px",
                }}
              />
            </Box>

            <Skeleton
              variant="rectangle"
              sx={{
                padding: "0 10px",
                minHeight: "15px",
                minWidth: { md: "100px", xs: "60px" },
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      </ListItem>

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
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
                padding: "0 10px",
              }}
            >
              <Skeleton
                variant="rectangle"
                sx={{ minWidth: 75, height: 75, borderRadius: "20px" }}
              />
              <Skeleton
                variant="rectangle"
                sx={{
                  marginLeft: "25px",
                  minHeight: "15px",
                  minWidth: "100px",
                  borderRadius: "20px",
                }}
              />
            </Box>

            <Skeleton
              variant="rectangle"
              sx={{
                padding: "0 10px",
                minHeight: "15px",
                minWidth: { md: "100px", xs: "60px" },
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );
}

export default TrendSkeleton;
