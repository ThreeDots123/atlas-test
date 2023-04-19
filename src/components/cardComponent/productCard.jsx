import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Rating, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/cartAction";
import "./product card style.css"

import image from "./pexels-andrea-piacquadio-3771088-min.jpg"

function InnerCard() {
  return <div className="productcard">
    <figure>
      <img src={image} alt="product name" />
    </figure>
    <section className="details">
      <div className="min-details">
        <h1>Remera </h1>
        <h1 className="price">$45.99</h1>
      </div>
      <a href="#" className="addtocartbtn">add to cart</a>
    </section>
  </div>
}


export default function ProductCard({ data, addToCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);
  const { adding } = useSelector((state) => state.cart);

  // const addToCart = () => {
  //   dispatch(addItemToCart(id, count));
  //   setCart(true);
  // };

  data.price = parseFloat(data.price)

  return (
    <Grid item sx={{ margin: "0px !important" }}>
      <InnerCard />
    </Grid>
  );
}
