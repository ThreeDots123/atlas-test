// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Stack,
//   Paper,
//   Typography,
//   TextField,
//   CircularProgress,
//   Alert,
//   AlertTitle,
//   FormControl,
// } from "@mui/material";
// // import { createBrand } from "../../../redux/actions/brandAction";
// import { createBrand } from "../../../redux/actions/brandAction";
// import CreateBrandSteps from "./CreateBrandSteps";
// import Navbar from "../../../components/navbar/Navbar";
// import Footer from "../../../components/footer/Footer";
// import { saveBrandInfo } from "../../../redux/actions/brandAction";
// function Personal() {
//   const [navbar, setNavbar] = useState(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { createBrandInfo } = {}
//   const [brandLogo, setBrandLogo] = useState();
//   const [brandLogoPreview, setBrandLogoPreview] = useState(
//     "/images/default_Avater.png"
//   );

//   const handleChangeL = (e) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setBrandLogoPreview(reader.result);
//         setBrandLogo(reader.result);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };
//   const data = localStorage.getItem("createBrandInfo");
//   const { brandName, brandDetail, brandType, location } = {}
//   const { loading, brand, error } = {}
//   // useEffect(() => {
//   //   if (brand) {
//   //     navigate("/dashboard");
//   //   }
//   // }, [brand, navigate]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       saveBrandInfo({
//         brandName,
//         brandDetail,
//         brandType,
//         location,
//         brandLogo,
//       })
//     );
//     dispatch(
//       createBrand({
//         brandName,
//         brandDetail,
//         brandType,
//         location,
//         brandLogo,
//       })
//     );
//   };

//   return (
//     <Box sx={{ background: "white" }}>
//       <Navbar
//         navbar={navbar}
//         setNavbar={setNavbar}
//         active="active"
//         background="white"
//         border={true}
//       />
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           height: "100vh",
//           paddingTop: { md: "200px", xs: "150px" },
//           paddingBottom: "20px",
//           marginBottom: "70px",
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             margin: "50px 0px",
//             width: { md: "40%", xs: "90%" },
//             padding: "20px",
//             borderRadius: "15px",
//           }}
//         >
//           <div style={{ margin: "0", padding: "0" }}>
//             <Typography
//               sx={{ fontWeight: "800", margin: "9px 0px", fontSize: "1.2em" }}
//             >
//               Atlas
//             </Typography>
//             <CreateBrandSteps personal />
//             {loading ? (
//               <Box
//                 sx={{
//                   width: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: "30px 0px",
//                 }}
//               >
//                 <CircularProgress size={90} />
//               </Box>
//             ) : (
//               <Stack direction="column" spacing={2} sx={{ margin: "9px 0px" }}>
//                 {/* brandLogo */}
//                 <FormControl
//                   fullWidth
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography>Brand Logo</Typography>

//                   <Box
//                     sx={{
//                       border: "0.1px dashed grey",
//                       borderRadius: "20px",
//                       width: "50%",
//                       height: "200px",
//                       justifySelf: "center",
//                       display: "flex",

//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <input
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                       type="file"
//                       name="brandLogo"
//                       multiple
//                       onChange={handleChangeL}
//                     />
//                   </Box>

//                   <Stack
//                     direction="row"
//                     spacing={3}
//                     sx={{ borderRadius: "10px" }}
//                   >
//                     <img
//                       style={{ borderRadius: "inherit" }}
//                       src={brandLogoPreview}
//                       alt="images-preview"
//                       width="55"
//                       height="52"
//                     />
//                   </Stack>
//                 </FormControl>
//               </Stack>
//             )}
//             {error && (
//               <Alert severity="error">
//                 <AlertTitle>Error</AlertTitle>
//                 {error}
//               </Alert>
//             )}
//           </div>

//           <Stack
//             alignItems="flex-end"
//             justifyContent="space-between"
//             direction="row"
//             sx={{ padding: "0px 20px", margin: "9px 0px" }}
//           >
//             <Button
//               onClick={() => navigate("/brandLocation")}
//               color="primary"
//               type="submit"
//               variant="outlined"
//               sx={{ "&:focus": { outline: "none" }, width: "30%" }}
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={submitHandler}
//               color="primary"
//               type="submit"
//               variant="contained"
//               sx={{ "&:focus": { outline: "none" }, width: "30%" }}
//               disabled={loading ? true : false}
//             >
//               submit
//             </Button>
//           </Stack>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default Personal;


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
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import { baseUrl, origin } from "../../../urls";
import store from "../../../redux/store";
import { loadUser } from "../../../redux/actions/userActions";

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
    if(user.role === "seller" || user.role === "admin") {
      navigate("/dashboard")
    }
  }, [])

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const [creatingBrand, setCreatingBrand] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});


  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData();

    setCreatingBrand(true)

    formData.append("name", brandName);
    formData.append("type", "SK");
    formData.append("slogan", brandDetail);
    formData.append("user", user.id);
    formData.append("profile", brandLogo);
    formData.append("cover", backgroundImage);

    // Create brand
    fetch(`${origin}/${baseUrl}/brands/handlebrand`, {
      method: "POST",
      body: formData
    }).then(response => {
      if(response.status === 400 || response.status === 201 || response.status === 200) return response.json()
      else throw new Error("Something went wrong")
    })
    .then(data => {
      console.log(data)
      if (data.success === true) {
        // Reset user data
        store.dispatch(loadUser());
        navigate(`/dashboard`)
      } else {
        const message = data.detail ? data.detail : "Something went wrong"
        setSnackbar({open: true, message})
        setCreatingBrand(false)
      }
    }).catch(err => {
      setSnackbar({open: true, message: err.message})
      setCreatingBrand(false)
    })
  };

  
  


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
          paddingTop: { md: "9vh", xs: "9vh" },
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
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
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
                      required
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
                        loading={creatingBrand}
                        onClick={handleSubmit}
                      >
                        {/* { creatingBrand ? <CircularProgress size={15} sx={{color:"white"}} /> : 'Create'} */}
                        Create
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
