import React, { useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import { getNewBrands } from "../../redux/actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

function Swiper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector((state) => state.newBrands);
  useEffect(() => {
    if (error) {
      console.log("error");
    }
    dispatch(getNewBrands());
  }, [dispatch, error]);

  const navigateToBrand = (id) => {
    navigate(`/brand/${id}`);
  };
  return (
    <Box className="slider-container">
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation, A11y, Autoplay]}
        autoplay={
          (true,
          {
            delay: 5000,
          })
        }
        style={{ overflow: "hidden" }}
        loop={true}
        className="main-slide-container"
        // install Swiper modules
        navigation={{ color: "black" }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
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
        {brands &&
          brands.map((brand) => (
            <SwiperSlide
              className="slide"
              key={brand._id}
              onClick={() => {
                navigateToBrand(brand._id);
              }}
            >
              <>
                <img
                  className="slide-image"
                  src={brand.brandLogo.url}
                  alt={brand.brandName}
                />{" "}
                <span className="brand-title">
                  <Typography className="brand-name">
                    {brand.brandName}
                  </Typography>
                </span>
              </>
            </SwiperSlide>
          ))}
      </Slider>
    </Box>
  );
}

export default Swiper;
