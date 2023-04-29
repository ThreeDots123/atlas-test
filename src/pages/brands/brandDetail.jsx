import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  ButtonGroup,
  IconButton,
  Skeleton,
  Menu
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Navbar from "../../components/navbar/Navbar";
import water from "../../images/water.jpg";
import pepsi from "../../images/pepsi.jpg";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppsIcon from "@mui/icons-material/Apps";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProductCard from "../../components/cardComponent/productCard";
import Footer from "../../components/footer/Footer";
import PrimarySearchAppBar from "../../components/search";

import { useParams } from "react-router-dom";
import { categories } from "../../utils/stateData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/brandAction";
import { getBrandDetail } from "../../redux/actions/brandAction";
import BrandProoducts from "./brandComponent/BrandProoducts";
import { useNavigate, useLocation } from "react-router-dom";

import { origin, baseUrl } from "../../urls";

const days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
]

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            Read More
          </Typography>
        ) : (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            show less
          </Typography>
        )}
      </span>
    </p>
  );
};

function BrandDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [navbar, setNavbar] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const navigate = useNavigate()

  // const { brandDetail, loading, error } = useSelector(
  //   (state) => state.brandDetails
  // );

  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };

  //category section

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // useEffect(() => {
  //   dispatch(getBrandDetail(id));
  // }, [dispatch, id]);

  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${origin}/${baseUrl}/brands/${id}`).then(response => {
      if(response.status === 404) return {}
      return response.json()
    }).then(apiData => {
      if (apiData.success === true) {
        const {detail} = apiData
        const date = new Date(detail.date_created)
        detail.date_created = `${days[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        setData(detail)
      } else {
        setData(null)
      }
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "72px", xs: "50px" },
          backgroundColor: "white",
          paddingBottom: "20px",
          fontFamily: "Montserrat"
        }}
      >
        { data !== null ? <>
          <Box
          sx={{
            width: "100%",
            height: { md: "50vh", xs: "30vh" },
            position: "relative",
          }}
        >
          {loading ?
            <Skeleton variant="rectanguler" sx={{ width: "100%", height: "inherit" }} /> : <>
             { data.cover_img !== "No photo" ? <figure style={{height: "300px", width: "100%"}}>
                <img style={{ width: "100%", height: "inherit", objectFit:"cover" }} src={data.cover_img} alt={data.name} />
              </figure> :
              <Avatar sx={{ width: "100%", height: "inherit", borderRadius: "0px" }}>{data.name}</Avatar>} 
              <Box
                sx={{
                  position: "absolute",
                  top: { md: "25vh", xs: "18vh" },
                  left: "20px",
                }}
              >
                  <Avatar src={data.profile_img} alt="image" sx={{
                      border: "5px solid white",
                      borderRadius: "20px",
                      width: { md: "200px", xs: "100px" },
                      height: { md: "200px", xs: "100px" },
                    }}
                  />
              </Box>

            </>
          }
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            paddingTop: { md: "50px", sm: "30px", xs: "15px" },
          }}
        >
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
          >
            {loading ? <Skeleton variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                }} /> : <Typography
                sx={{
                  marginTop: "25px",
                  paddingTop: { md: "auto", xs: "" },
                  paddingLeft: { md: "25px", xs: "10px" },
                  fontWeight: "900",
                  fontSize: { md: "25px", sm: "20px", xs: "18px" },
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Chivo Mono"
                }}
              >
                {data.name}
                <span style={{ color: "blue" }}>
                  <IconButton sx={{ color: "blue" }}>
                    <VerifiedIcon sx={{ fontSize: "15px" }} />
                  </IconButton>
                </span>
              </Typography>
            }
          </Stack>
          {/* <Menu>
            <MenuItem onClick={() => navigate("/newProduct")}>
              Add Item
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate("/myBrand")}>
              Update Brand
            </MenuItem>
          </Menu> */}
          <div style={{ width: "100%" }}>
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                  marginTop: "10px",
                }}
              />
            ) : (<>
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                <Typography>
                  Created at <span style={{ fontWeight: "700", fontFamily: "Montserrat" }}>{data.date_created}</span>
                </Typography>
              </Box>
            <Box
              sx={{
                paddingLeft: { md: "25px", xs: "10px" },
                paddingTop: "10px",
                height: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "900",  fontFamily: "Chivo Mono", }} variant="h5">
                Description
              </Typography>

              <Typography
                sx={{
                  width: { md: "70%", xs: "100%" },
                }}
              >
                {/* {brandDetail?.brandDetail.split().length > 50 ? (
                  brandDetail?.brandDetail
                ) : (
                  <ReadMore>{brandDetail?.brandDetail}</ReadMore>
                )} */}
                {data.slogan}
              </Typography>
            </Box> </>)}
          </div>

          {loading ? <></> : <BrandProoducts
            toggle={toggle}
            toggelSideBar={toggelSideBar}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            id={id}
          />}
        </Box>
        </> : <>
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
        </>}
      </Box>
    </>
  );
}

export default BrandDetail;
