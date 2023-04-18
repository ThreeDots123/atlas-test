import React, { useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import { getNewBrands } from "../../../redux/actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import Button from "@mui/material/Button";
import { Stack, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { getRecommendedProduct } from "../../../redux/actions/productAction";

function RecommendedProducts({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.recommendedProducts
  );
  useEffect(() => {
    if (error) {
      console.log("error");
    }
    // dispatch(getNewBrands());
    dispatch(getRecommendedProduct(id));
  }, [dispatch, error, id]);

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
        {products &&
          products.map((product) => (
            <SwiperSlide className="slide" key={product._id}>
              <Card
                sx={{ width: { md: 300, sm: 200, xs: 250 } }}
                component="div"
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="150"
                  image={product.images[0].url}
                />
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography gutterBottom sx={{ fontWeight: "600" }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      <span>&#8358;</span>
                      {product.price}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Rating
                      value={Number(product.rating)}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <Typography>({product.numberOfReviews} reviews)</Typography>
                  </Stack>
                  {/* <Typography variant="body2" color="text.secondary">
                     hello
                  </Typography> */}
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                    background: "rgb(24, 104, 183)",
                  }}
                  component="div"
                >
                  <Button
                    size="small"
                    sx={{ color: "white" }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View details
                  </Button>
                  {/* <LoadingButton
                        loading={adding ? true : false}
                        variant="outlined"
                        sx={{ "&:focus": { outline: "none" },color: "white"  }}
                        onClick={addToCart}
                        disabled={book?.book?.stock === 0}
                      >
                        <Typography variant="h5">Add to cart</Typography>
                      </LoadingButton> */}
                  <Button size="small" sx={{ color: "white" }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
      </Slider>
    </Box>
  );
}

export default RecommendedProducts;
