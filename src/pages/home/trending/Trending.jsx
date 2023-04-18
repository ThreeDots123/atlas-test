import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, List, Stack } from "@mui/material";
import Trend from "./Trend";
import { getTrendingProducts } from "../../../redux/actions/productAction";
import TrendSkeleton from "./TrendSkeleton";

function Trending() {
  const dispatch = useDispatch();

  const { loading, error, firstHalf, secondHalf } = useSelector(
    (state) => state.trendingProducts
  );

  useEffect(() => {
    dispatch(getTrendingProducts());
  }, [dispatch]);

  return (
    <Box className="Trendings">
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "1.4em",
          paddingLeft: { md: "0px", xs: "10px" },
        }}
      >
        Trending Products
      </Typography>
      <Divider sx={{ paddingTop: "15px" }} />

      <Stack direction={{ md: "row", xs: "column" }} spacing={4}>
        <Box sx={{ width: { md: "50%", xs: "100%" } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: "10px 15px" }}
          >
            <Typography
              sx={{ color: " rgb(112, 122, 131)", fontWeight: "600" }}
            >
              Sellers
            </Typography>
            <Typography
              sx={{ color: " rgb(112, 122, 131)", fontWeight: "600" }}
            >
              category
            </Typography>
          </Stack>

          <List sx={{ marginTop: "10px" }}>
            {loading && <TrendSkeleton />}
            {firstHalf &&
              firstHalf.map((data) => <Trend key={data._id} data={data} />)}
          </List>
        </Box>

        <Box
          sx={{
            width: { md: "50%", xs: "100%" },
            display: { md: "block", xs: "none" },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: "10px 15px" }}
          >
            <Typography
              sx={{ color: " rgb(112, 122, 131)", fontWeight: "600" }}
            >
              Sellers
            </Typography>
            <Typography
              sx={{ color: " rgb(112, 122, 131)", fontWeight: "600" }}
            >
              category
            </Typography>
          </Stack>
          <List sx={{ marginTop: "10px" }}>
            {loading ? (
              <TrendSkeleton />
            ) : (
              secondHalf &&
              secondHalf.map((data) => <Trend key={data._id} data={data} />)
            )}
          </List>
        </Box>
      </Stack>
    </Box>
  );
}

export default Trending;
