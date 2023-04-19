import React, { useState } from "react";
import { useNavigate, useLocation, useAsyncError } from "react-router-dom";
import { origin, baseUrl } from "../../urls"

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  List,
  Paper,
  ListItemButton,
  Pagination,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import { getAllBrands } from "../../redux/actions/brandAction";
import { brandTypes } from "../../utils/stateData";
import Navbar from "../../components/navbar/Navbar";
import AppsIcon from "@mui/icons-material/Apps";
import PrimarySearchAppBar from "../../components/search";
import ProductCard from "../../components/cardComponent/productCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLoader from "../../components/cardComponent/productCardSkeleton";
import { getAllProducts } from "../../redux/actions/productAction";
import Footer from "../../components/footer/Footer";
import BrandCard from "../../components/cardComponent/brandCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};


// const data = {
//   brandName: "Shoprite",
//   verified: true,
//   "_id": 12,
//   backgroundImage: true,
//   brandLogo: {
//     url: "data"
//   }
// }

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BrandProoducts({ id }) {
  const [toggle, setToggle] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [navbar, setNavbar] = useState(true);

  const [page, setPage] = useState(1);
  const [brandType, setBrandType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search");
  const {
    loading,
    brands,
    brandCount,
    filteredBrandCount,
    numberOfPages,
    searchNumberOfPages,
    error,
  } = useSelector((state) => state.allBrandsReducer);

  // useEffect(() => {
  //   dispatch(getAllBrands(searchQuery, page, brandType));
  // }, [dispatch, searchQuery, page, brandType]);
  const [dataLoading, setDataLoading] = useState(true)
  const [data, setData] = useState(undefined)
  
  useEffect(() => {
    fetch(`${origin}/${baseUrl}/brands/user?brand=${searchQuery}`).then(response => {
      return response.json()
    }).then(apiData => {
      setData(apiData)
      setDataLoading(false)
    })
  }, [searchQuery])

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleBrandTypeSelect = (brandType) => {
    setBrandType(brandType);
  };
  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  //modal setup
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Request data from api



  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "100px", xs: "60px" },
          paddingBottom: "20px",
        }}
        >
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-evenly"
          style={{height: "300px"}}
        >
          <Paper
            elevation={0}
            sx={{
              margin: "0px !important",
              paddingBottom: "20px",
              backgroundColor: "transparent",
              width: {
                md: `${toggle ? "75%" : "100%"}`,
                xs: `${"100%"}`,
              },
            }}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ padding: "0", margin: "0", width: "auto" }}
            >
              { dataLoading ? <ProductCardLoader /> :         
                data.count > 0 ? data.detail.map((data, index) => <BrandCard key={index} data={data} />) :
                <Box
                  sx={{
                    padding: "inherit",
                    margin: "auto",
                    width: "inherit",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "800",
                      fontSize: "2em",
                      textAlign: "center",
                    }}
                  >
                    No Brand found
                  </Typography>
                </Box>
              }
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}

export default BrandProoducts;
