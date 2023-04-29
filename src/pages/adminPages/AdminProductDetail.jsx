import React, { useState, useEffect, forwardRef } from "react";
import {
  Stack,
  Alert,
  Snackbar,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  CircularProgress
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";

import {
  getProduct,
  updateProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { SET_PRODUCTS } from "../../redux/reducers/highlightReducer";

import { states, categories } from "../../utils/stateData";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";
import { baseUrl, origin } from "../../urls";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="error" elevation={6} ref={ref} {...props} />;
});

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});

  const { id } = useParams();
  const { error, product } = useSelector((state) => state.productDetail);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const file = e.target.files[0];
    
    setImage(file);
  };

  const handleChange2 = (e) => {
    const file = e.target.files[0];
    
    setImage2(file);
  };


  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
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
    formData.append("img_1", image)
    formData.append("img_2", image2)

    // if (user.role === "admin") formData.set("status", status);
    setUpdatingProduct(true)

    fetch(`${origin}/${baseUrl}/products/handleproduct/${id}`, {
      method: "PUT",
      body: formData,
    }).then(response => {
      if(response.status === 400 || response.status === 200) return response.json()
      else throw new Error("Something went wrong")
    })
    .then(data => {
      if (data.success === true) {
        navigate(`/productList`)
      } else {
        const message = data.detail ? data.detail : "Something went wrong"
        setSnackbar({open: true, message})
        setUpdatingProduct(false)
      }
    }).catch(err => {
      setSnackbar({open: true, message: err.message})
      setUpdatingProduct(false)
    })

    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    dispatch({ type: SET_PRODUCTS });
  });
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const toggle = () => {
    setState((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
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
              <>
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
                    Product Detail
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
                    <TextField
                      label="Item Name"
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-amount"
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Stock
                      </InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        label="Stock"
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </FormControl>

                    <div className="form-group">
                      <label>Images</label>

                      <div className="custom-file">
                        <input
                          type="file"
                          name="product_images"
                          className="custom-file-input"
                          id="customFile"
                          onChange={handleChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Select Image 1
                        </label>
                      </div>
                      <div className="custom-file" style={{marginTop: "20px"}}>
                        <input
                          type="file"
                          name="product_images"
                          className="custom-file-input"
                          id="customFile"
                          onChange={handleChange2}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Select Image 2
                        </label>
                      </div>
                    </div>
                    <Stack
                      justifyContent="flex-end"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <LoadingButton
                        id="login_button"
                        type="submit"
                        color="primary"
                        variant="contained"
                        // loading={loading ? true : false}
                        disabled={updatingProduct}
                        
                        sx={{
                          width: "20%",
                          background: "rgb(24, 104, 183)",
                          color: "white",
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": {
                            border: "1px solid",
                            color: "black",
                          },
                        }}
                        onClick={handleSubmit}
                      >
                        { updatingProduct ? <CircularProgress size={15} sx={{color:"white"}} /> : "update product" }
                      </LoadingButton>
                      <Snackbar
                        open={snackbar.open}
                        autoHideDuration={4000}
                        onClose={() => setSnackbar(oldState => ({...oldState, open:false}))}
                      >
                        <SnackbarAlert>
                          <Typography>{snackbar.message}</Typography>
                        </SnackbarAlert>
                      </Snackbar>
                    </Stack>
                  </Stack>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default UpdateProduct;
