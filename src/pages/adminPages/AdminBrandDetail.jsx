import React, { useEffect, useState, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import Sidebar from "../../components/navbar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";
import {
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Stack,
  Box,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  updateBrand,
  clearErrors,
  getBrandDetail,
} from "../../redux/actions/brandAction";

import { LoadingButton } from "@mui/lab";
import { SET_BRAND_LIST } from "../../redux/reducers/highlightReducer";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function AdminBrandDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const { id } = useParams();
  const [disable, setDisable] = useState(true);
  //   const { loading, order } = useSelector((state) => state.orderDetails);
  const {
    brandDetail,
    loading,
    error: err,
  } = useSelector((state) => state.brandDetails);
  // const { isUpdated, updating } = useSelector((state) => state.updateBrand);
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(brandDetail && brandDetail.verified);

  // useEffect(() => {
  //   dispatch(getBrandDetail(id));

  //   if (err) {
  //     dispatch(clearErrors());
  //   }
  //   if (isUpdated) {
  //     setOpenUpdate(true);
  //   }
  // }, [err, isUpdated, dispatch, navigate, id]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    dispatch({ type: SET_BRAND_LIST });
  }, [dispatch]);
  const toggle = () => {
    setState((prev) => !prev);
  };
  const updateBrandHandler = () => {
    dispatch(updateBrand(brandDetail._id, { verified: verified }));
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Snackbar open={openUpdate} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarAlert>
          <Typography>update successful</Typography>
        </SnackbarAlert>
      </Snackbar>
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
          height: " 100%",
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
              height: "100vh",
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
                    Brand Details
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginTop: { md: "", sm: "10px", xs: "10px" },
                    padding: { md: "15px", sm: "0px", xs: "0px" },
                    width: { md: "98%", ms: "100%", xs: "100%" },
                    display: { md: "flex", sm: "flex", xs: "flex" },
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <>
                    {loading ? (
                      <Container
                        fixed
                        sx={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress color="warning" size="small" />
                      </Container>
                    ) : (
                      <Stack
                        direction={{ md: "row", sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Box sx={{ width: { md: "49%", xs: "100%" } }}>
                          <Typography variant="h5">
                            Brand ID : {brandDetail && brandDetail._id}
                          </Typography>
                          <Stack
                            direction="column"
                            spacing={0.5}
                            sx={{
                              marginTop: "15px",
                              padding: "10px",
                              boxShadow: 5,
                            }}
                          >
                            <Typography>
                              <b>Brand Name: </b>{" "}
                              {brandDetail && brandDetail.brandName}
                            </Typography>
                            <Typography>
                              <b>Brand Type </b>{" "}
                              {brandDetail && brandDetail.brandType}
                            </Typography>
                            <Typography>
                              <b>Location: </b>
                              {brandDetail && brandDetail.location}
                            </Typography>
                            <Typography>
                              <b>user Id:</b>
                              {brandDetail && brandDetail.user._id}
                            </Typography>

                            <Divider />

                            <Typography>
                              <b> Verified : </b>

                              {brandDetail && brandDetail.verified === true && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#87d287",
                                  }}
                                >
                                  true
                                </Typography>
                              )}
                              {brandDetail && brandDetail.verified !== true && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#f3855a",
                                  }}
                                >
                                  false
                                </Typography>
                              )}
                            </Typography>

                            <Typography>
                              <b>Bank :</b>
                              {brandDetail && brandDetail.bank}
                            </Typography>
                            <Typography>
                              <b>Account Name :</b>
                              {brandDetail && brandDetail.accountName}
                            </Typography>
                            <Typography>
                              <b>Account Number :</b>
                              {brandDetail && brandDetail.accountNumber}
                            </Typography>
                            <Typography>
                              <b>Phone Number :</b>
                              {brandDetail && brandDetail.phoneNumber}
                            </Typography>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            width: { md: "49%", xs: "100%" },
                          }}
                        >
                          <Typography variant="h5">update Brand</Typography>
                          <Box sx={{ marginTop: "15px" }}>
                            <FormControlLabel
                              label={verified ? "Verify" : "Unverify"}
                              control={
                                <Switch
                                  checked={verified}
                                  onChange={(e) => {
                                    setDisable(false);
                                    setVerified(e.target.checked);
                                  }}
                                />
                              }
                            />
                            <LoadingButton
                              disabled={disable}
                              onClick={updateBrandHandler}
                              // loading={updating ? true : false}
                              sx={{
                                background: "rgb(24, 104, 183)",
                                color: "white",
                                "&:focus": {
                                  background: "rgb(24, 104, 183)",
                                  outline: "none",
                                },
                                "&:hover": {
                                  background: "rgb(24, 104, 183)",
                                  border: "1px solid",
                                  color: "white",
                                },
                              }}
                            >
                              update Brand
                            </LoadingButton>
                          </Box>
                        </Box>
                      </Stack>
                    )}
                  </>
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

export default AdminBrandDetail;
