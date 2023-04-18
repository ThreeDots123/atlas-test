import React from "react";
import { Box } from "@mui/material";
import { Navigation, A11y } from "swiper";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardComponent from "../../../components/cardComponent/card";
import bag from "../../../images/bag.jpg";
import headset from "../../../images/headset.jpg";
import mouse from "../../../images/mouse.jpg";
import nike from "../../../images/nike.jpg";
import pepsi from "../../../images/pepsi.jpg";
import pouch from "../../../images/pouch.jpg";
import watch from "../../../images/watch.jpg";
import water from "../../../images/water.jpg";
function CardSlider({ data }) {
  return (
    <Box className="slider-container">
      <Slider
        className="main-slide-container"
        style={{
          padding: "15px 5px",
          margin: "5px",
        }}
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
            spaceBetween: 30,
          },
          // when window width is >= 640px
          700: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        // install Swiper modules
        modules={[Navigation, A11y]}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data.map((item) => (
          <SwiperSlide className="card-slide">
            <CardComponent data={item} />
          </SwiperSlide>
        ))}
      </Slider>
    </Box>
  );
}

export default CardSlider;
