// import React, { useState, useEffect } from "react";
// import {
  //   Typography,
//   Stack,
//   TextField,
//   Box,
//   Alert,
//   AlertTitle,
//   Paper,
// } from "@mui/material";

// import { Link, useNavigate } from "react-router-dom";
// import { LoadingButton } from "@mui/lab";
import { clearErrors, login } from "../../redux/actions/userActions";

// function Signin() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState(null);
//   const { loading, isAuthenticated, logError } = useSelector(
//     (state) => state.auth
//   );
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    // dispatch(login(formData));
//   };
//   // const redirect = location.search ? location.search.split("=")[1] : "/";

//   useEffect(() => {
//     if (logError) {
//       setMessage(logError);
//       clearErrors();
//     }
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate, logError]);

//   return (
//     <Box
//       sx={{
//         height: "70vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: "15vh",
//       }}
//     >
//       <Paper sx={{ borderRadius: "10px", width: { md: "40%", xs: "100%" } }}>
//         <Stack
//           direction="column"
//           spacing={1}
//           sx={{
//             boxShadow: { xs: "none", md: 10 },

//             padding: "10px",
//             borderRadius: "10px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Typography variant="h3">Atlas Sign In</Typography>
//           </div>
//           {message && (
//             <>
//               <Alert severity="error">
//                 <AlertTitle>Error</AlertTitle>
//                 <Typography variant="h5">{message}</Typography>
//               </Alert>
//             </>
//           )}
//           <form
//             autoComplete="off"
//             onSubmit={handleSubmit}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <TextField
//               sx={{ margin: "10px" }}
//               label="Emial Address"
//               name="email"
//               type="text"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               sx={{ margin: "10px" }}
//               label="Password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             <Stack
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <LoadingButton
//                 onClick={handleSubmit}
//                 variant="contained"
//                 loading={loading ? true : false}
//                 sx={{ "&:focus": { outline: "none" }, width: "100%" }}
//               >
//                 Sign In
//               </LoadingButton>
//             </Stack>
//           </form>

//           <Typography>
//             Don't have an account{" "}
//             <Link to="/sign-up" sx={{ cursor: "pointer" }}>
//               {" "}
//               <Typography variant="h6" color="secondary">
//                 Sign Up
//               </Typography>{" "}
//             </Link>
//             <Link to="/forgot-password" sx={{ cursor: "pointer" }}>
//               {" "}
//               <Typography variant="h6" color="primary">
//                 Forgot Password
//               </Typography>{" "}
//             </Link>
//           </Typography>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

// export default Signin;


import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Alert, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../logo';
import {baseUrl,origin} from "../../urls"
import { useEffect } from "react";

const theme = createTheme();
const errorAlert = React.createRef()

export default function SignIn() {

  const { loading, isAuthenticated, logError } = useSelector(
    (state) => state.auth
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [msg, setMsg] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  
  const showError = (text) => {
    setMsg(text)
    errorAlert.current.style.display = "flex"
    setTimeout(() => {
      errorAlert.current.style.display = "none"
    }, 1500)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // check user data
    function removeWhitespace(data){
      return data.replace(/ /g, "")
    }
    const email = data.get("email")
    const password = data.get("password")
    const validate = Boolean(removeWhitespace(email) && removeWhitespace(password))
    if(validate){
      setSubmitting(true)
      // make request to login
      fetch(`${origin}/${baseUrl}/accounts/user/login?auth=password&type=web`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then(response => response.json())
      .then(data => {
        if(data.success) {
          const { detail: {access} } = data
          dispatch(login(access))
          navigate("/")
        } else {
          showError(data.detail)
          setSubmitting(false)
        }
      })
      .catch(err =>{
        showError("Something went wrong")
        setSubmitting(false)
      })
    } else {
      // display alert
      showError("Please ensure that each input field is correctly filled")
    }
  };

  return <>
    { isAuthenticated ? <Navigate to={"/"} /> : <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography
          onClick={() => navigate("/")}
          className="logo"
          style={{width: "100%", display: "flex", justifyContent: "center"}}
          sx={{ width: { md: "10%", xs: "20%" }, cursor: "pointer", paddingTop: 5 }}
        >
          <Logo text />
        </Typography>
        <Box
          sx={{
            paddingTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{backgroundColor: "#1f4172"}} sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <div style={{marginTop: "1rem", display: "flex", justifyContent: "flex-end", width: "100%"}}>
              <Alert style={{width: "95%", display: "none"}} ref={errorAlert} severity="error">
                {msg}
              </Alert>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              fullWidth
              variant="contained"
              style={{background: "#1f4172"}}
              sx={{ mt: 3, mb: 2 }}
              // ref = {btnRef}
            >
              { !submitting ? "sign in" : <CircularProgress size={"16px"} sx={{margin: "5px 0", color: "white"}} /> }
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>}
  </>
}