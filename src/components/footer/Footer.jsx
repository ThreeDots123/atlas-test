import React from "react";
import "./footer.scss";
import {
  Typography,
  Box,
  Button,
  Stack,
  ButtonGroup,
  IconButton,
  TextField,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <div className="footer-container" style={{ margin: 0, paddingLeft: 0 }}>
      <Box
        className="footer-topic"
        sx={{
          padding: "0px",
          margin: "0px",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          className="mailing"
          flexDirection=" row"
          sx={{
            display: { md: "block", xs: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "inherit",
          }}
        >
          <Typography variant="h5" color="white" className="topic">
            Stay in the loop
          </Typography>
          <Typography
            variant="body2"
            color="white"
            className="mailing-sentence"
            sx={{
              paddingTop: "10px",
              width: { md: "50%", xs: "100%" },
              fontSize: "1.02em",
            }}
          >
            Join our mailing list to stay in the loop with our newest feature
            releases, brands, and products and Resturants for navigating Ahia.
          </Typography>
          <Stack
            className="form-input"
            direction="row"
            justifyContent="space-between"
            sx={{
              width: { xs: "100%" },
              padding: "10px 0px",
            }}
          >
            <TextField
              type="email"
              label="Your Email Address"
              color="secondary"
              sx={{
                width: "70%",
                background: "white",
                borderRadius: "20px",
              }}
            />
            <Button
              sx={{
                width: "25%",
                fontSize: { md: "20px", xs: "12px" },
                backgroundColor: "rgb(32, 129, 226)",
                color: "white",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
        <Divider
          sx={{ display: { md: "none", xs: "block" }, margin: "20px 20px" }}
        />

        <Box
          className="socials"
          sx={{
            margin: "0px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            className="topic"
            sx={{ width: "100%" }}
          >
            Join the community
          </Typography>
          <Stack direction="row" sx={{ paddingTop: "10px" }}>
            <ButtonGroup>
              <IconButton
                sx={{ margin: "5px", backgroundColor: "rgb(32, 129, 226)" }}
              >
                <TwitterIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton
                sx={{ margin: "5px", backgroundColor: "rgb(32, 129, 226)" }}
              >
                <InstagramIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton
                sx={{ margin: "5px", backgroundColor: "rgb(32, 129, 226)" }}
              >
                <FacebookIcon sx={{ color: "white" }} />
              </IconButton>
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ margin: "20px 20px" }} />

      <Box
        className="link-container"
        sx={{
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          className="product-description"
          sx={{
            width: { md: "30%", xs: "100%" },
            display: { md: "block", xs: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="white" className="topic">
            Ahia
          </Typography>
          <Typography
            variant="body2"
            color="white"
            className="mailing-sentence"
            sx={{ paddingTop: "10px", width: "100%", fontSize: "1.02em" }}
          >
            The worlds first and largest digital marketplace for brands and
            products. Buy, sell, and discover exclusive brands and products.
          </Typography>
        </Box>

        <Box
          className="quick-links"
          sx={{
            width: { md: "60%", xs: "100%" },
            marginTop: { md: "0px", xs: "20px" },
          }}
        >
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={{ md: "7", xs: "1" }}
            sx={{ padding: "10px", width: "100%" }}
            justifyContent="space-between"
          >
            <Stack direction="column">
              <Typography variant="h5" color="white" className="topic">
                Marketplace
              </Typography>
              <List>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Brands</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Resturants</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Plugs</Typography>
                </ListItem>
              </List>
            </Stack>
            <Stack direction="column">
              <Typography variant="h5" color="white" className="topic">
                My Account
              </Typography>
              <List>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Profile</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ color: "white" }}>orders</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ color: "white" }}>collections</Typography>
                </ListItem>
              </List>
            </Stack>
            <Stack direction="column" sx={{ marginLeft: "0px !important" }}>
              <Typography variant="h5" color="white" className="topic">
                Resources
              </Typography>
              <List>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Learn</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ color: "white" }}>Blogs</Typography>
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ margin: "20px 20px" }} />

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "0px 10px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "11px" }}>
          © 2023
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "30%",
            fontSize: "11px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "11px" }}>
            <a style={{ color: "white", textDecoration: "none" }} href="/">
              privacy policy
            </a>
          </Typography>
          <Typography>
            <a
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "11px",
              }}
              href="/"
            >
              Terms of service
            </a>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
