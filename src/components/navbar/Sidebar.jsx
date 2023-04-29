import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  // const { brand } = useSelector((state) => state.myBrand);
  const navigate = useNavigate();
  const url = useLocation()
  const value = url.pathname.split("/")[1]
  

  return (
    <div>
      <List disablePadding>
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/dashboard");
            }}
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
              background: value === "dashboard" ? "rgb(24, 104, 183)" : "",
              color: value === "dashboard" ? "white" : "",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" secondary={user?.role} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
              background: value === "orderList" ? "rgb(24, 104, 183)" : "",
              color: value === "dashboardorderList" ? "white" : "",
            }}
            onClick={() => navigate("/orderList")}
          >
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <Divider />
        { user.role === "admin" || <>
          <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem
              sx={{
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              <ListItemButton
                sx={{
                  "&:hover": {
                    background: "rgb(24, 104, 183)",
                    color: "white",
                  },
                  borderRadius: "10px",
                  background: value === "newProduct" || value === "productList" ? "rgb(24, 104, 183)" : "",
                  color: value === "newProduct" || value === "productList" ? "white" : "",
                }}
                // onClick={() => {
                //   navigate("/newProduct");
                // }}
              >
                <ListItemIcon>
                  <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              spacing={2}
              direction="column"
              sx={{ alignItems: "start", margin: "0px", padding: "0px" }}
            >
              <ListItem
                sx={{
                  marginTop: "5px",
                  cursor: "pointer",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  sx={{
                    "&:hover": {
                      background: "rgb(24, 104, 183)",
                      color: "white",
                    },
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    navigate("/productList");
                  }}
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  marginTop: "5px",
                  cursor: "pointer",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  sx={{
                    "&:hover": {
                      background: "rgb(24, 104, 183)",
                      color: "white",
                    },
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    navigate("/newProduct");
                  }}
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Item" />
                </ListItemButton>
              </ListItem>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Divider />
        </>}

        {user && user.role === "admin" && (
          <>
            <ListItem
              sx={{
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              <ListItemButton
                sx={{
                  "&:hover": {
                    background: "rgb(24, 104, 183)",
                    color: "white",
                  },
                  borderRadius: "10px",
                  background: value === "brands" ? "rgb(24, 104, 183)" : "",
                  color: value === "brands" ? "white" : "",
                }}
                onClick={() => navigate(`/admin/brands`)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Brand List" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              <ListItemButton
                sx={{
                  "&:hover": {
                    background: "rgb(24, 104, 183)",
                    color: "white",
                  },
                  borderRadius: "10px",
                  background: value === "users" ? "rgb(24, 104, 183)" : "",
                  color: value === "users" ? "white" : "",
                }}
                onClick={() => navigate(`/admin/users`)}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        )}
        { user.role === "seller" && <>
          <ListItem
            sx={{
              marginTop: "5px",
              cursor: "pointer",
            }}
          >
            <ListItemButton
              sx={{
                "&:hover": {
                  background: "rgb(24, 104, 183)",
                  color: "white",
                },
                borderRadius: "10px",
                background: value === "myBrand" ? "rgb(24, 104, 183)" : "",
                color: value === "myBrand" ? "white" : "",
              }}
              onClick={() => navigate(`/myBrand`)}
            >
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText primary="My Brand" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>}
      </List>
    </div>
  );
}

export default Sidebar;
