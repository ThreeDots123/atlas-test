import React, { useState, useEffect, forwardRef } from "react";
// import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
// import { Container } from "@mui/system";
import {
  CircularProgress,
  Rating,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { LoadingButton } from "@mui/lab";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
// import { Navigation, A11y } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import RecommendedProducts from "./productComponents/RecommendedProducts";
// import ProductReview from "./productComponents/productReview";
import { addItemToCart } from "../../redux/actions/cartAction";
import { baseUrl, origin } from "../../urls";

// const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
//   return <Alert severity="warning" elevation={6} ref={ref} {...props} />;
// });
// const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
//   return <Alert severity="success" elevation={6} ref={ref} {...props} />;
// });
// function ProductDetail() {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const [state, setState] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [cart, setCart] = useState(false);
//   const [navbar, setNavbar] = useState(true);
//   const [count, setCount] = useState(1);
//   const { success } = useSelector((state) => state.review);
//   const { adding } = useSelector((state) => state.cart);
//   const { id } = params;
//   const { loading, product, error } = useSelector(
//     (state) => state.productDetail
//   );
  
//   // useEffect(() => {
//   //   dispatch(getProduct(id));
//   // }, [dispatch, id, success]);

//   useEffect(() => {
//     fetch(`${origin}/${baseUrl}/products/${id}`).then(response => {
//       if(response.status === 404) return {}
//       else return response.json()
//     }).then(data => {
//       console.log(data)
//     })
//   }, [])

//   const toggleView = (view) => {
//     setState((prev) => (prev ? false : true));
//   };

//   const handleClose = (e, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleClose2 = (e, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setCart(false);
//   };
//   //handle couner
//   const increaseQty = () => {
//     if (count >= Number(2)) {
//       setOpen(true);
//       return;
//     } else {
//       const qty = count + 1;
//       setCount(qty);
//     }
//   };
//   const decreaseQty = () => {
//     if (count <= 1) return;
//     const qty = count - 1;
//     setCount(qty);
//   };

//   // add product to cart
//   const addToCart = () => {
//     dispatch(addItemToCart(id, count));
//     setCart(true);
//   };

//   // function addToCart() {
//   //   console.log("clicked")
//   // }

//   return (
//     <>
//       <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
//       <Box
//         sx={{
//           height: "auto",
//           paddingTop: { md: "72px", xs: "50px" },
//           backgroundColor: "white",
//           paddingBottom: "20px",
//         }}
//       >
//         {product && (
//           <>
//             <Stack
//               direction={{ md: "row", xs: "column" }}
//               sx={{
//                 marginTop: "10px",
//                 width: { md: "100%", xs: "auto" },
//                 padding: "10px",
//               }}
//               justifyContent="space-around"
//             >
//               <Box
//                 sx={{
//                   width: { md: "46%", xs: "100%" },
//                   height: "80vh",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <Swiper
//                   style={{
//                     width: "100%",
//                     height: "inherit",
//                     border: "1px solid gray",
//                     borderRadius: "inherit",
//                   }}
//                   slidesPerView={1}
//                   modules={[Navigation, A11y]}
//                   navigation
//                   onSwiper={(swiper) => console.log(swiper)}
//                   onSlideChange={() => console.log("slide change")}
//                 >
//                   {product?.product?.images.map((item) => (
//                     <SwiperSlide key={item.url}>
//                       <img
//                         src={item.url}
//                         alt="productimage"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           borderRadius: "5px",
//                         }}
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </Box>

//               <Box
//                 sx={{
//                   width: { md: "47%", xs: "100%" },
//                   maxHeigth: "20vh",
//                 }}
//               >
//                 <Typography variant="h3">{product?.product?.name}</Typography>
//                 <Typography>
//                   <strong>Stock:</strong> {product?.product?.stock}
//                 </Typography>
//                 <Box className="d-flex mb-3">
//                   <div className="text-primary mr-2">
//                     <Rating
//                       defaultValue={Number(product?.product?.rating)}
//                       precision={0.5}
//                       size="medium"
//                       readOnly
//                     />
//                   </div>
//                   <small className="pt-1">
//                     ({product?.product?.numberOfReviews} reviews)
//                   </small>
//                 </Box>
//                 <h3 className="font-weight-semi-bold mb-4">
//                   <span style={{ color: "green" }}>&#8358;</span>
//                   {product?.product?.price}
//                 </h3>

//                 <Stack
//                   spacing={2}
//                   sx={{ flexDirection: { xs: "column", md: "row" } }}
//                 >
//                   <ButtonGroup
//                     variant="contained"
//                     orientation="horizontal"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       boxShadow: 0,
//                     }}
//                   >
//                     <IconButton
//                       sx={{ "&:focus": { outline: "none" } }}
//                       onClick={decreaseQty}
//                     >
//                       <RemoveIcon />
//                     </IconButton>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         textAlign: "center",
//                         verticalAlign: "center",
//                         padding: "4px",
//                         border: "0.1px solid gray",
//                       }}
//                     >
//                       {count}
//                     </Typography>
//                     <IconButton
//                       color="warning"
//                       sx={{ "&:focus": { outline: "none" } }}
//                       onClick={increaseQty}
//                     >
//                       <AddIcon />
//                     </IconButton>
//                   </ButtonGroup>

//                   <LoadingButton
//                     loading={adding ? true : false}
//                     variant="outlined"
//                     sx={{
//                       "&:focus": { outline: "none" },
//                       background: "rgb(24, 104, 183)",
//                     }}
//                     onClick={addToCart}
//                     disabled={product?.product?.stock === 0}
//                   >
//                     <Typography variant="h5">Add to cart</Typography>
//                   </LoadingButton>
//                 </Stack>

//                 <Box
//                   sx={{
//                     marginTop: "10px",
//                     padding: "5px",
//                   }}
//                 >
//                   <Typography variant="h6">Description</Typography>
//                   <p className="mb-4">{product?.product?.description}</p>
//                 </Box>
//               </Box>
//             </Stack>
//             <ProductReview product={product} id={id} />
//             <Box
//               sx={{
//                 border: "0.1px solid grey",
//                 margin: "15px 15px",
//                 borderTopRightRadius: "10px",
//                 borderTopLeftRadius: "10px",
//               }}
//             >
//               <Box
//                 sx={{
//                   padding: "10px 10px",
//                   borderTopRightRadius: "10px",
//                   borderTopLeftRadius: "10px",
//                 }}
//               >
//                 <Typography sx={{ fontWeight: "900" }}>
//                   More From This Brand
//                 </Typography>
//                 <Divider sx={{ width: "100%", paddingTop: "15px" }} />
//               </Box>
//               <Box sx={{ padding: "20px 20px" }}>
//                 <RecommendedProducts id={id} />
//               </Box>
//             </Box>
//           </>
//         )}

//         {error && <Typography> {error}</Typography>}
//         <Snackbar
//           open={open}
//           autoHideDuration={10000}
//           onClose={handleClose}
//           sx={{ width: "300px" }}
//         >
//           <SnackbarAlert sx={{ width: "inherit" }}>
//             <Typography>Out of stock</Typography>
//           </SnackbarAlert>
//         </Snackbar>

//         <Snackbar open={cart} autoHideDuration={4000} onClose={handleClose2}>
//           <SnackbarAlert2>
//             <Typography>Item Added to cart</Typography>
//           </SnackbarAlert2>
//         </Snackbar>
//         <Snackbar open={success} autoHideDuration={4000} onClose={handleClose2}>
//           <SnackbarAlert2>
//             <Typography>Posted</Typography>
//           </SnackbarAlert2>
//         </Snackbar>
//       </Box>
//     </>
//   );
// }

// export default ProductDetail;

import { Container } from "@mui/material";
import "./style.css"
import Navbar from "../../components/navbar/Navbar";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="warning" elevation={6} ref={ref} {...props} />;
});

const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

const ImageCarousel = ({ img }) => {
  return <div className="product-image">
    <img src={img} alt="product"/>
  </div>
}

const ImageThumbnails = ({ data, setImg, state }) => {
  return <div className='thumbnails'>
    { data.image_1 !== "No Media" ? 
      <img className={state === 1 ? "image-selected" : ""} src={data.image_1} alt="thumbnail 1" onClick={() => setImg({img:data.image_1, state:1})} /> : 
      <></> 
    }
    { data.image_2 !== "No Media" ? 
      <img className={state === 2 ? "image-selected" : ""} src={data.image_2} alt="thumbnail 2" onClick={() => setImg({img:data.image_2, state:2})} /> : 
      <></> 
    }
    {/* { data.video !== "No Media" ? <img className= "image-selected" src={data.video} alt="thumbnail 3" /> : <></> } */}
  </div>
}

const ImageViewer = ({ data }) => {
  // const img = data.image_1 !== "No Media" ? data.image_1 : data.video
  const [mainImage, setImage] = useState({ img:data.image_1, state: 1})
  return <div className="image-viewer">
    <ImageCarousel img={mainImage.img} />
    <ImageThumbnails data={data} setImg={setImage} state={mainImage.state} />
  </div>
}
// ##############################

const ProductInformation = ({ data }) => {

  return  <div>
      <h3 className='product-brand'>{data.brand}</h3>
      <h1 className='product-title'>{data.title}</h1>
      <p className='product-info'>{data.description}</p>
      
      <div className='prices'>
        <div className='product-price'>
          <h1>$125.00</h1>
          {/* <span>50%</span> */}
        </div>
        {/* <span className="real-price">$250.00</span> */}
      </div>
    
  </div>
}

const Counter = ({ counter, setCounter, setOpen, supply }) => {

  const increaseQty = () => {
    if (counter >= Number(supply)) {
      setOpen(true);
      return;
    } else {
      const qty = counter + 1;
      setCounter(qty);
    }
  };
  const decreaseQty = () => {
    if (counter <= 1) return;
    const qty = counter - 1;
    setCounter(qty);
  };

  return <div className='counter-container'>
    <button onClick={decreaseQty} className='minus'>-</button>
      <span>{counter}</span>
    <button onClick={increaseQty} className='plus'>+</button>
  </div>
}

const CustomButton = (props) => {
  return <button {...props}>{props.children}</button>
}

const CartImg = (props) => {
    return <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" {...props}/>
  </svg>
}

const ProjectDescription = ({ counter, setCounter, setOpen, addToCart, data }) => {
  return <div className='product-description'>
    <ProductInformation data={data} />
    <div className="description-buttons">
        <Counter counter={counter} setCounter={setCounter} setOpen={setOpen} supply={data.supply} />
        <CustomButton onClick={addToCart} className="addtocart-button">
          <CartImg fill='white' className="cart-img" />
        Add to cart</CustomButton>
    </div>
  </div>
}


const Loader = () => {
  return <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <CircularProgress />
  </div> 
}

export default function ProductDetail () {

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [navbar, setNavbar] = useState(true);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const addToCart = () => {
    dispatch(addItemToCart(data.id, count));
    setCart(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClose2 = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCart(false);
  };

  useEffect(() => {
    fetch(`${origin}/${baseUrl}/products/${id}`).then(response => {
      if(response.status === 404) return {}
      else return response.json()
    }).then(data => {
      if (data.success) {
        const {detail} = data
        // Search for brand name
        fetch(`${origin}/${baseUrl}/brands/${detail.brand}`).then(response => {
          return response.json()
        }).then(apiData => {
          detail.brand = apiData.detail.name
          setData(detail)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })
  }, [])

  return <>
    {loading ? <Loader /> : data ? <div style={{backgroundColor: "white", height: "100vh"}}>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Container sx={{paddingTop: "70px", paddingLeft: 0, paddingRight: 0}}>
        {/* Buttons */}
        <div className="product-page">
          <ImageViewer data={data} />
          <ProjectDescription data={data} counter={count} setCounter={setCount} setOpen={setOpen} addToCart={addToCart} />
        </div>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        sx={{ width: "300px" }}
      >
        <SnackbarAlert sx={{ width: "inherit" }}>
          <Typography>Out of stock</Typography>
        </SnackbarAlert>
      </Snackbar>
      <Snackbar open={cart} autoHideDuration={1000} onClose={handleClose2}>
        <SnackbarAlert2>
          <Typography>Item Added to cart</Typography>
        </SnackbarAlert2>
      </Snackbar>
    </div> : <Box sx={{ padding: "inherit", margin: "auto", width: "inherit", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
      <Typography sx={{
        fontWeight: "800",
        fontSize: "2em",
        textAlign: "center",
      }} >
        No Product found
      </Typography>
    </Box>
    } 
  </> 
}