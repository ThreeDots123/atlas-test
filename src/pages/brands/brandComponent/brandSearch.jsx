import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, A11y, Autoplay } from "swiper";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { Swiper as Slider, SwiperSlide } from "swiper/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../redux/actions/brandAction";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";
import VerifiedIcon from "@mui/icons-material/Verified";

function BrandSearch({ searchQuery }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [brandType, setBrandType] = useState("");
  const dispatch = useDispatch();
  const { loading, brands, error } = useSelector(
    (state) => state.allBrandsReducer
  );

  useEffect(() => {
    dispatch(getAllBrands(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <>
      <Typography
        sx={{ paddingLeft: "10px", fontWeight: "600", fontSize: "1.5em" }}
      >
        Brands
      </Typography>
      {brands && brands.length === 0 && (
        <Typography
          sx={{
            border: "1px solid black",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "2em",
          }}
        >
          {`Sorry No Brand Marches Your search (${searchQuery})`}
        </Typography>
      )}
      {loading && (
        <>
          <SwiperSlide className="slide">
            <Skeleton
              variant="rectanguler"
              sx={{
                width: "inherit",
                height: "inherit",
                borderRadius: "inherit",
              }}
            />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <Skeleton
              variant="rectanguler"
              sx={{
                width: "inherit",
                height: "inherit",
                borderRadius: "inherit",
              }}
            />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <Skeleton
              variant="rectanguler"
              sx={{
                width: "inherit",
                height: "inherit",
                borderRadius: "inherit",
              }}
            />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <Skeleton
              variant="rectanguler"
              sx={{
                width: "inherit",
                height: "inherit",
                borderRadius: "inherit",
              }}
            />
          </SwiperSlide>
        </>
      )}
      {brands && brands.length > 0 && (
        <Box sx={{ padding: "15px" }}>
          <Slider
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              // when window width is >= 640px
              700: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, A11y, Autoplay]}
            style={{ overflow: "hidden" }}
            className="main-slide-container"
            // install Swiper modules
            navigation={{ color: "black" }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {brands.map((brand) => (
              <SwiperSlide className="slide" key={brand._id}>
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: 5,
                    margin: "9px",
                  }}
                  component="div"
                  onClick={() => navigate(`/brand/${brand._id}`)}
                >
                  {brand.backgroundImage ? (
                    <CardMedia
                      component="img"
                      alt={brand.brandName}
                      height="150"
                      image={
                        brand?.backgroundImage ? (
                          brand?.backgroundImage.url
                        ) : (
                          <Avatar />
                        )
                      }
                    />
                  ) : (
                    <CardMedia>
                      <Avatar
                        sx={{
                          width: "inherit",
                          borderRadius: "0px",
                          height: "150px",
                        }}
                      >
                        {brand.brandName}
                      </Avatar>
                    </CardMedia>
                  )}
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ position: "relative" }}
                    >
                      <Avatar
                        src={brand?.brandLogo.url}
                        sx={{
                          borderRadius: "10px",
                          width: "60px",
                          height: "60px",
                          position: "absolute",
                          bottom: "3px",
                          border: "5px solid white",
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: "800",
                          justifySelf: "flex-end",
                          marginLeft: "80px",
                          width: "auto",
                          overflowX: "hidden",
                        }}
                      >
                        {brand.brandName}
                        {brand.verified && (
                          <span style={{ color: "blue" }}>
                            <IconButton sx={{ color: "blue" }}>
                              <VerifiedIcon sx={{ fontSize: "15px" }} />
                            </IconButton>
                          </span>
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Slider>
        </Box>
      )}
    </>
  );
}

export default BrandSearch;
