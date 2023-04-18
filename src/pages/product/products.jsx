import React, { useState, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  Snackbar,
  Alert,
} from "@mui/material";
import { categories } from "../../utils/stateData";
import Navbar from "../../components/navbar/Navbar";
import AppsIcon from "@mui/icons-material/Apps";
import ProductCard from "../../components/cardComponent/productCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLoader from "../../components/cardComponent/productCardSkeleton";
import { getAllProducts } from "../../redux/actions/productAction";
import Footer from "../../components/footer/Footer";
import BrandSearch from "../brands/brandComponent/brandSearch";
import Modal from "@mui/material/Modal";
import { addItemToCart } from "../../redux/actions/cartAction";

const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
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

function BrandProoducts({ id }) {
  const [toggle, setToggle] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [navbar, setNavbar] = useState(true);
  const [cart, setCart] = useState(false);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search");
  const {
    loading,
    products,
    productCount,
    filteredProductCount,
    numberOfPages,
    searchNumberOfPages,
    error,
  } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts(searchQuery, page, category));
  }, [dispatch, searchQuery, page, category]);

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleCategorySelect = (category) => {
    setCategory(category);
  };
  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  //add product to cart
  const addToCart = (id) => {
    dispatch(addItemToCart(id, 1));
    setCart(true);
  };
  //modal setup
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCart(false);
  };
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
        >
          <Paper
            elevation={24}
            sx={{
              transition: "0.5s",
              width: `${toggle ? "23%" : "0%"}`,
              minHeight: "100vh",
              display: { md: "flex", sm: "flex", xs: "none" },
              justifyContent: "start",
            }}
          >
            {toggle && (
              <Box
                sx={{
                  transition: "0.5s",
                  overflow: "hidden",
                  width: "100%",
                  margin: "10px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Filter By Category
                  </Typography>
                  <Chip
                    label="clear category"
                    onClick={() => setCategory("")}
                  />
                </Stack>

                <List component="nav" aria-label="secondary mailbox folder">
                  <Divider />

                  {categories.map((category) => (
                    <ListItemButton
                      key={category.key}
                      selected={selectedIndex === category.key}
                      onClick={() => handleCategorySelect(category.cat)}
                    >
                      {" "}
                      <ListItemText
                        sx={{ fontWeight: "700" }}
                        primary={category.cat}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
          <Paper
            elevation={24}
            sx={{
              margin: "0px !important",
              paddingBottom: "20px",
              width: {
                md: `${toggle ? "75%" : "100%"}`,
                xs: `${"100%"}`,
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: "0px 10px" }}
            >
              <IconButton
                onClick={() => toggelSideBar()}
                sx={{
                  background: "rgb(32, 129, 226)",
                  margin: "5px",
                  display: { md: "flex", sm: "flex", xs: "none" },
                }}
              >
                <AppsIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={handleOpen}
                sx={{
                  margin: "5px",
                  display: { md: "none", sm: "none", xs: "flex" },
                }}
              >
                <AppsIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
              {!category && <Chip label={"All Products"} />}
              {category && <Chip label={`${category}`} />}
            </Stack>
            <Divider />
            {searchQuery && <BrandSearch searchQuery={searchQuery} />}
            <Typography
              sx={{ paddingLeft: "10px", fontWeight: "600", fontSize: "1.5em" }}
            >
              Products
            </Typography>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ padding: "0", margin: "0", width: "auto" }}
            >
              {loading && <ProductCardLoader />}
              {products &&
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    data={product}
                    addToCart={addToCart}
                  />
                ))}
              {products && products.length === 0 && (
                <Box
                  sx={{
                    padding: "inherit",
                    margin: "inhert",
                    width: "inherit",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "800",
                      fontSize: "2em",
                      textAlign: "center",
                    }}
                  >
                    No Product found
                  </Typography>
                </Box>
              )}
            </Grid>
            <Stack
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={
                  searchQuery || category ? searchNumberOfPages : numberOfPages
                }
                page={Number(page)}
                onChange={handleChange}
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                  color: "blue",
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List component="nav" aria-label="secondary mailbox folder">
            <Typography
              sx={{
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Filter By Category
            </Typography>{" "}
            <Divider />
            {categories.map((category) => (
              <ListItemButton
                key={category.key}
                selected={selectedIndex === category.key}
                onClick={() => {
                  handleCategorySelect(category.cat);
                  handleClose();
                }}
              >
                {" "}
                <ListItemText
                  sx={{ fontWeight: "700" }}
                  primary={category.cat}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Modal>
      <Snackbar open={cart} autoHideDuration={4000} onClose={handleClose2}>
        <SnackbarAlert2>
          <Typography>Item Added to cart</Typography>
        </SnackbarAlert2>
      </Snackbar>
    </>
  );
}

export default BrandProoducts;
