import { Container } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
]


function Profile() {

  const { user, loading } = useSelector((state) => state.auth);
  let date = new Date(user.date_joined)
  date = `${days[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

  return (
    <Container
      fluid
      sx={{
        height: "90vh",
        marginTop: { xs: "9vh", md: "11vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      {loading ? (
        <Container fixed>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <h3
            style={{
              width: "auto",
              paddingLeft: "6px",

              borderLeft: "10px solid #1f4172",
              borderBottom: "0.1px solid #1f4172",
              borderRadius: "10px",
              borderBottomRightRadius: "0px",
            }}
          >
            My profile
          </h3>
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={3} sx={{ margin: "20px" }}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                alt={user?.name}
                src={user?.avatar?.url}
              />
              <Link to="/update-profile">
                <Button style={{ margin: "12px auto 0" }} variant="contained">Edit Profile</Button>
              </Link>
            </Stack>

            <Stack spacing={2} sx={{ padding: "2px", marginTop: "40px", textAlign: "center" }}>
              <p style={{ fontFamily: "Montserrat", fontSize: "20px" }}>
                Full Name: <span style={{fontSize:"initial"}} >{`${user.first_name} ${user.last_name}`}</span>
              </p>

              <p style={{ fontFamily: "Montserrat", fontSize: "20px" }} >
                Email Address: <span style={{ fontSize: "initial" }} >{user?.email}</span>
              </p>

              <p style={{ fontFamily: "Montserrat", fontSize: "20px" }} >
                Joined On: <span style={{ fontSize: "initial" }} >{date}</span>
              </p>

              <div style={{display: "flex", justifyContent: "center", gap: "20px", marginTop: "50px"}} >
                {user.role !== "admin" && (
                  <Link to="/orders/me">
                    <Button variant="contained">My Orders</Button>
                  </Link>
                )} 

                <Link to="/update-password">
                  <Button variant="contained">Change Password</Button>
                </Link>
              </div>
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Profile;


// import React from "react";

// export default function Profile() {
//   return <h1>Hello World</h1>
// }