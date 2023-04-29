import React, { useEffect, useState, forwardRef } from "react";
import {
  IconButton,
  Typography,
  Box,
  Modal,
  Alert,
  Snackbar,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import ArticleIcon from "@mui/icons-material/Article";
import { SET_BRAND_LIST } from "../../redux/reducers/highlightReducer";
// import { deleteProduct } from "../../redux/actions/productAction";
import { allBrands } from "../../redux/actions/brandAction";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import { baseUrl, origin } from "../../urls";
// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function BrandList() {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggle = () => {
    setState((prev) => !prev);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, md: 400 },
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);

  const [brands, setBrands] = useState()

  const [openM, setOpenM] = useState(false);
  const handleCloseM = () => setOpenM(false);

  // const [open, setOpen] = useState(false);

  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  // useEffect(() => {
  //   dispatch(allBrands());
  //   // if (deleteError) {
  //   //   alert(deleteError);
  //   // }
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch({ type: SET_BRAND_LIST });
  // }, [dispatch]);
  // const handleDelete = (id) => {
  //   dispatch(deleteProduct(id));
  // };

  useEffect(() => {
    // fetch all brands
    if(user.role === "admin") {
      fetch(`${origin}/${baseUrl}/brands/handlebrand`).then(response => {
        if(response.status === 400 || response.status === 200) return response.json()
        else throw new Error("Something went wrong")
      })
      .then(data => {
        if (data.success === true) {
          setBrands(data.detail)
        }
      })
    } else {
      navigate("/")
    }
  }, [])

  const columns = [
    "Brand Id",
    "Logo",
    "Brand Name",
    "Brand Type",
    "Status",
    // "Edit",
  ];
  const data = [];
  brands &&
    brands.map((brand) =>
      data.push([
        brand.id,
        <Avatar src={brand.profile_img} alt={brand.brandName} />,
        brand.name,
        "Store",
        // brand.verified ? (
          <Typography
            sx={{
              padding: "5px",
              fontSize: "0.9em",
              borderRadius: "15px",
              background: "#87d287",
              textAlign: "center",
              color: "whitesmoke",
            }}
          >
            verified
          </Typography>,
        // ) : (
        //   <Typography
        //     sx={{
        //       padding: "5px",
        //       fontSize: "0.9em",
        //       borderRadius: "15px",
        //       background: "#f3855a",
        //       textAlign: "center",
        //       color: "whitesmoke",
        //     }}
        //   >
        //     unverified
        //   </Typography>
        // ),
        // <Link to={`/admin/brand/${brand.id}`}>
        //   <IconButton sx={{ "&:focus": { outline: "none" } }}>
        //     <EditIcon color="primary" />
        //   </IconButton>
        // </Link>,
      ])
    );

  const options = {
    filterType: "checkbox",
    responsive: "standard",
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
                    All Brand
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    overflowX: "scroll",
                    brderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <MUIDataTable
                    title={"Brand List"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Box>

                <Snackbar
                  open={false}
                  autoHideDuration={4000}
                  // onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar>
                <Modal
                  open={openM}
                  onClose={handleCloseM}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Book
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you wan't to delete this book?
                    </Typography>
                    <Stack>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => setOpenM(false)}
                      >
                        cancel
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          setOpenM(false);
                        }}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default BrandList;
