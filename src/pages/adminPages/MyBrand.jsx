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
  Select,
  MenuItem,
  TextField,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";

import { UPDATE_BRAND_RESET } from "../../redux/constants/brandConstant";
import {
  updateBrand,
  clearErrors,
  getMyBrand,
} from "../../redux/actions/brandAction";
import { SET_MY_BRAND } from "../../redux/reducers/highlightReducer";
import { states } from "../../utils/stateData";
import { useNavigate } from "react-router-dom";
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

function MyBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [brandName, setBrandName] = useState("");
  const [brandType, setBrandType] = useState("");
  const [brandDetail, setBrandDetail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsApp, setWhatsApp] = useState();
  const [faceBook, setFaceBook] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [bank, setBank] = useState("");
  const [accountName, setAccountname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [brandLogo, setBrandLogo] = useState([]);
  const [brandLogoPreview, setBrandLogoPreview] = useState(
    "/images/default_Avater.png"
  );
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [backgroundPreview, setBackgroundPreview] = useState(
    "/images/default_Avater.png"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeL = (e) => {
    const file = e.target.files[0];
    
    setBrandLogo(file);
  };

  const handleChangeC = (e) => {
    const file = e.target.files[0];
    
    setBackgroundImage(file);
  };

  useEffect(() => {
    if(user.role === "admin") {
      navigate("/dashboard")
    }
  })

  const [updatingBrand, setUpdatingBrand] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});
  
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData();

    setUpdatingBrand(true)

    formData.append("name", brandName);
    formData.append("slogan", brandDetail);
    formData.append("user", user.id);
    formData.append("profile", brandLogo);
    formData.append("cover", backgroundImage);

    // Create brand
    fetch(`${origin}/${baseUrl}/brands/handlebrand`, {
      method: "PUT",
      body: formData
    }).then(response => {
      if(response.status === 400 || response.status === 201 || response.status === 200) return response.json()
      else throw new Error("Something went wrong")
    })
    .then(data => {
      if (data.success === true) {
        const { detail: { id } } = data
        // Reset user data
        navigate(`/brand/${id}`)
      } else {
        const message = data.detail ? data.detail : "Something went wrong"
        setSnackbar({open: true, message})
        setUpdatingBrand(false)
      }
    }).catch(err => {
      setSnackbar({open: true, message: err.message})
      setUpdatingBrand(false)
    })
  };

  //ui functionalities
  useEffect(() => {
    dispatch({ type: SET_MY_BRAND });
  }, [dispatch]);

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
                    My brand
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
                      boxShadow: 2,
                      borderRadius: "15px",
                    }}
                  >
                    {errorMessage && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                      </Alert>
                    )}
                    {/* brandLogo */}
                    <FormControl
                      fullWidth
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Brand Logo</Typography>

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
                        <input
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          type="file"
                          name="brandLogo"
                          onChange={handleChangeL}
                        />
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ borderRadius: "10px" }}
                      >
                        <img
                          style={{ borderRadius: "inherit" }}
                          src={brandLogoPreview}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      </Stack>
                    </FormControl>

                    {/* background */}
                    <FormControl
                      fullWidth
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Cover Image (Optional)</Typography>

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
                        <input
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          type="file"
                          name="coverImage"
                          id="customFile"
                          onChange={handleChangeC}
                        />
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ borderRadius: "10px" }}
                      >
                        <img
                          style={{ borderRadius: "inherit" }}
                          src={backgroundPreview}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      </Stack>
                    </FormControl>

                    <TextField
                      label="Brand Name"
                      type="text"
                      name="brandName"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                    {/* <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Brand Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandType}
                        label="Location"
                        name="brandType"
                        onChange={(e) => setBrandType(e.target.value)}
                      >
                        <MenuItem value="Plug">Plug</MenuItem>
                        <MenuItem value="Store">Store</MenuItem>
                        <MenuItem value="Mall">Mall</MenuItem>
                        <MenuItem value="Restaurants">Restaurants</MenuItem>
                      </Select>
                    </FormControl> */}
                    <TextField
                      id="outlined-multiline-static"
                      label="Brand Slogan"
                      multiline
                      rows={4}
                      color="primary"
                      placeholder="Brand Slogan"
                      value={brandDetail}
                      onChange={(e) => setBrandDetail(e.target.value)}
                    />
                    {/* <TextField
                      label="Bank"
                      type="text"
                      name="bank"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      required
                    />
                    <TextField
                      label="Account Name"
                      type="text"
                      name="accountName"
                      value={accountName}
                      onChange={(e) => setAccountname(e.target.value)}
                      required
                    />
                    <TextField
                      label="Account Number"
                      type="text"
                      name="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                    <TextField
                      label="Phone Number"
                      type="text"
                      name="phoneMumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    /> */}

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
                      <LoadingButton
                        sx={{
                          width: "20%",
                          outline: "none"
                        }}
                        loading={updatingBrand}
                        onClick={handleSubmit}
                      >
                        {/* { updatingBrand ? <CircularProgress size={15} sx={{color:"white"}} /> : 'Create'} */}
                        Update
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(oldState => ({...oldState, open:false}))}>
        <SnackbarAlert>
          <Typography>{snackbar.message}</Typography>
        </SnackbarAlert>
      </Snackbar>
    </>
  );
}

export default MyBrand;
