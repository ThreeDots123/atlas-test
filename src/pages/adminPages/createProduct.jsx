import React, { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  AlertTitle,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { getMyBrand } from "../../redux/actions/brandAction";
import { useNavigate } from "react-router-dom";
import { CREATE_PRODUCTS_RESET } from "../../redux/constants/productConstants";
import Sidebar from "../../components/navbar/Sidebar";
import { SET_PRODUCTS } from "../../redux/reducers/highlightReducer";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import { categories, states } from "../../utils/stateData";
import { createProduct, clearErrors } from "../../redux/actions/productAction";
import { baseUrl, origin } from "../../urls";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="error" elevation={6} ref={ref} {...props} />;
});

function CreateProduct() {
  //ui functionalities
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);
  useEffect(() => {
    dispatch({ type: SET_PRODUCTS });
  });

  const toggle = () => {
    setState((prev) => !prev);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  //create product functionalities
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [stock, setStock] = useState();
  const [location, setLocation] = useState();
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});

  const { user } = useSelector(state => state.auth)

  const handleChange = (e) => {
    const file = e.target.files[0];
    
    setImages(file);
  };

  const handleChange2 = (e) => {
    const file = e.target.files[0];

    setImages2(file)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("supply", stock);
    formData.append("user", user.id);
    formData.append("img_1", images)
    formData.append("img_2", images2)

    setCreatingProduct(true)

    fetch(`${origin}/${baseUrl}/products/handleproduct`, {
      method: "POST",
      body: formData,
    }).then(response => {
      if(response.status === 400 || response.status === 200 || response.status === 201) return response.json()
      else throw new Error("Something went wrong")
    })
    .then(data => {
      if (data.success === true) {
        navigate(`/productList`)
      } else {
        const message = data.detail ? data.detail : "Something went wrong"
        setSnackbar({open: true, message})
        setCreatingProduct(false)
      }
    }).catch(err => {
      setSnackbar({open: true, message: err.message})
      setCreatingProduct(false)
    })

    // dispatch(createProduct(formData));
  };
  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar(oldState => ({...oldState, open:false}))}>
        <SnackbarAlert>
          <Typography>{snackbar.message}</Typography>
        </SnackbarAlert>
      </Snackbar>
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
          height: "100vh",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "inherit",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: "0.1px solid #d9d3d3",
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", padding: "0" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{
                    margin: "5px",
                    "&:focus": {
                      outline: "none",
                    },
                    display: { md: "block", ms: "none", xs: "none" },
                  }}
                  onClick={toggle}
                >
                  {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                </IconButton>
                <IconButton
                  sx={{
                    margin: "5px",
                    "&:focus": {
                      outline: "none",
                    },
                    display: { md: "none", sm: "block", xs: "block" },
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <ArticleIcon sx={{ fontSize: "1.2em" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                  Create New Item
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: { md: "", sm: "10px", xs: "10px" },
                  padding: { md: "15px", sm: "0px", xs: "0px" },
                  width: { md: "98%", ms: "100%", xs: "100%" },
                  display: { md: "flex", sm: "flex", xs: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  spacing={2}
                  direction="column"
                  sx={{
                    width: { md: "70%", sm: "100%", xs: "100%" },
                    padding: "12px 10px",
                    boxShadow: 20,
                    borderRadius: "15px",
                  }}
                >
                  {errorMessage && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {errorMessage}
                    </Alert>
                  )}
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        border: "0.1px dashed grey",
                        borderRadius: "20px",
                        width: "50%",
                        height: "200px",
                        justifySelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-amount">
                        Upload Images
                      </InputLabel> */}

                      <input
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        type="file"
                        name="product_images"
                        id="customFile"
                        placeholder="hello"
                        onChange={handleChange}
                      />
                    </Box>

                    <Box
                      sx={{
                        border: "0.1px dashed grey",
                        borderRadius: "20px",
                        width: "50%",
                        height: "200px",
                        justifySelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px"
                      }}
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-amount">
                        Upload Images
                      </InputLabel> */}

                      <input
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        type="file"
                        name="product_images"
                        id="customFile"
                        placeholder="hello"
                        onChange={handleChange2}
                      />
                      <p>(optional)</p>
                    </Box>

                    {/* <Stack
                      direction="row"
                      spacing={3}
                      sx={{ borderRadius: "10px" }}
                    >
                      {imagesPreview.map((img) => (
                        <img
                          style={{ borderRadius: "inherit" }}
                          key={img}
                          src={img}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      ))}
                    </Stack> */}
                  </FormControl>
                  <TextField
                    label="Item Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>

                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={price}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">
                          {" "}
                          &#8358;
                        </InputAdornment>
                      }
                      label="Item Price"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </FormControl>
                  <TextField
                    id="outlined-multiline-static"
                    label="Product Description"
                    multiline
                    rows={4}
                    color="primary"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Location"
                      name={location}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.key} value={cat.cat}>
                          {cat.cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Stock
                    </InputLabel>

                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={stock}
                      type="number"
                      label="Stock"
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={location}
                      label="Location"
                      name="location"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <Stack
                    justifyContent="flex-end"
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      sx={{
                        width: "20%",
                      }}
                      disabled={creatingProduct}
                      onClick={handleSubmit}
                    >
                      { creatingProduct ? <CircularProgress size={15} /> : "Create"}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>

        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default CreateProduct;
