import { Box, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Swiper from "../../components/swiper/Swiper";
import CardSlider from "./cardSlider/CardSlider";
import Trending from "./trending/Trending";
import { Container } from "@mui/material";
import { getBrandsInLocation } from "../../redux/actions/brandAction";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "../../components/cardComponent/brandCard";
import PrimarySearchAppBar from "../../components/search";
const CenterDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Home() {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, brandsInLocation, resturantsInLocation } = useSelector(
    (state) => state.brandsInLocationReducer
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getBrandsInLocation());
  }, [dispatch]);
  return (
    <>
      <Navbar home navbar={navbar} setNavbar={setNavbar} active="active" />
      <Container>
        <div className="body" style={{
            height: "100vh",
            display: "flex"
          }}>
          <div style={{margin: "auto"}}>
            <Typography variant="h2" sx={{
              marginBottom: "30px", 
              fontFamily:"Righteous",
              fontSize: { sm:"10vw", md:"57px" },
              textAlign: "center"
            }}>Access a brand from anywhere</Typography>
            <div style={{width: "100%", maxWidth: "600px", margin: "auto"}}>
              <PrimarySearchAppBar />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
