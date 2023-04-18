import React from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Box,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function MuiDrawer({
  open,
  close,
  handleClose,
  productNav,
  cartNav,
  profileNav,
  logOutNav,
  signUpNav,
  orderNav,
  homeNav,
  signInNav,
  brandNav,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Box
        p={2}
        width="100vw"
        textAlign="center"
        role="presentation"
        sx={{
          height: "100vh",
          padding: "0",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            width="80px"
            height="80px"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: " 1.5em",
                fontFamily: "sans-serif",
              }}
            >
              Atlas
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon
              sx={{
                fontWeight: "800",
                fontSize: " 1.5em",
                fontFamily: "sans-serif",
              }}
            />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ overflow: "scroll" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={homeNav}>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <HomeIcon sx={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography sx={{ fontWeight: "800" }}>Home</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={brandNav}>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <ApartmentIcon sx={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography sx={{ fontWeight: "800" }}>Brands</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={productNav}>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <AutoStoriesIcon sx={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography sx={{ fontWeight: "800" }}>Products</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={orderNav}>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <ShoppingCartCheckoutIcon sx={{ color: "black" }} />
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography sx={{ fontWeight: "800" }}>Orders</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
}

export default MuiDrawer;
