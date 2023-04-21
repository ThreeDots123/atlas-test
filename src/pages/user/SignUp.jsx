// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Typography,
//   Stack,
//   TextField,
//   Box,
//   Alert,
//   AlertTitle,
//   FormControl,
//   Select,
//   InputLabel,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { LoadingButton } from "@mui/lab";
// import { register, clearErrors } from "../../redux/actions/userActions";
// import { useNavigate } from "react-router-dom";
// import { states } from "../../utils/stateData";
// function SignUp() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [Message, setMessage] = useState(null);
//   const { loading, isAuthenticated, regError } = useSelector(
//     (state) => state.auth
//   );
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     location: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(register({ ...user }));
//   };

//   useEffect(() => {
//     if (regError) {
//       setMessage(regError);
//       clearErrors();
//     }
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate, regError]);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           padding: "15px",
//           width: "85%",
//           height: "85%",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Stack
//           direction="column"
//           spacing={1}
//           sx={{
//             boxShadow: 2,
//             width: "90%",
//             height: "90%",
//             border: "0.1px solid black",
//             overFlowY: "scroll",
//             padding: "15px",
//             borderRadius: "10px",
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             Atlas sign Up
//           </Typography>
//           {Message && (
//             <>
//               <Alert severity="error">
//                 <AlertTitle>Error</AlertTitle>
//                 <Typography variant="h5">{Message}</Typography>
//               </Alert>
//             </>
//           )}

//           <TextField
//             label="first Name"
//             type="text"
//             name="firstName"
//             value={user.firstName}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Last Name"
//             name="lastName"
//             type="text"
//             value={user.lastName}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             label="Emial Address"
//             name="email"
//             type="text"
//             value={user.email}
//             onChange={handleChange}
//             required
//           />
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Location</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={user.location}
//               label="Age"
//               name="location"
//               onChange={handleChange}
//             >
//               {states.map((state) => (
//                 <MenuItem key={state} value={state}>
//                   {state}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             value={user.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <Stack
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >z
//             <LoadingButton
//               onClick={handleSubmit}
//               variant="contained"
//               loading={loading ? true : false}
//               sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
//             >
//               Register
//             </LoadingButton>
//           </Stack>

//           <Typography>
//             Already have an account{" "}
//             <Link to="/sign-in" sx={{ cursor: "pointer" }}>
//               {" "}
//               <Typography variant="h5" color="primary">
//                 SIgn In
//               </Typography>{" "}
//             </Link>
//           </Typography>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

// export default SignUp;


import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { Alert, CircularProgress } from '@mui/material';
import { baseUrl, origin } from '../../urls';
import { register, clearErrors } from "../../redux/actions/userActions";


const theme = createTheme();

const errorAlert = React.createRef()
  
export default function SignUp() {

  const [user, setUser] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

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

  React.useEffect(() => {
    if(isAuthenticated) {
      navigate("/")
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // check user data
    function removeWhitespace(data){
      return data.replace(/ /g, "")
    }

    const email = data.get("email")
    const password = data.get("password")
    const last_name = data.get("lastName")
    const first_name = data.get("firstName")

    const validate = Boolean(removeWhitespace(first_name) && removeWhitespace(last_name) && removeWhitespace(email) && removeWhitespace(password))
    if(validate){
      setSubmitting(true)
      // make request to register
      fetch(`${origin}/${baseUrl}/accounts/user/register?auth=password&type=web`, {
        method: "POST",
        body: JSON.stringify({first_name, last_name, email, password}),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      }).then(response => response.json())
      .then(data => {
        if(data.success) {
          const { detail: {access} } = data
          dispatch(register(access))
          navigate("/")
        } else {
          showError(data.detail)
          setSubmitting(false)
        }
      })
      .catch(err =>{
        showError("Something went wrong, please try again")
        setSubmitting(false)
      })
    } else {
      // display alert
      showError("Please ensure that each input field is correctly filled")
    }
  };


  return (
    <Container>
      <ThemeProvider theme={theme}>
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
            <Avatar style={{backgroundColor: "#1f4172"}} sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    sx={{marginLeft: "10px"}}
                    control={<></>}
                    label="After successful registeration, Check your mail to verify your account"
                  />
              </Grid>
                <div  style={{marginTop: "1rem", display: "flex", justifyContent: "flex-end", width: "100%"}}>
                  <Alert style={{width: "95%", display: "none"}} ref={errorAlert} severity="error">
                    {msg}
                  </Alert>
                </div>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{background: "#1f4172"}}
              >
                { !submitting ? "sign up" : <CircularProgress size={"16px"} sx={{margin: "5px 0", color: "white"}} /> }
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="sign-in" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
}