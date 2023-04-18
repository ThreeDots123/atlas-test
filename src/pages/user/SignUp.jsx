import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { register, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { states } from "../../utils/stateData";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Message, setMessage] = useState(null);
  const { loading, isAuthenticated, regError } = useSelector(
    (state) => state.auth
  );
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...user }));
  };

  useEffect(() => {
    if (regError) {
      setMessage(regError);
      clearErrors();
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, regError]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          padding: "15px",
          width: "85%",
          height: "85%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            boxShadow: 2,
            width: "90%",
            height: "90%",
            border: "0.1px solid black",
            overFlowY: "scroll",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Atlas sign Up
          </Typography>
          {Message && (
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography variant="h5">{Message}</Typography>
              </Alert>
            </>
          )}

          <TextField
            label="first Name"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Emial Address"
            name="email"
            type="text"
            value={user.email}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user.location}
              label="Age"
              name="location"
              onChange={handleChange}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingButton
              onClick={handleSubmit}
              variant="contained"
              loading={loading ? true : false}
              sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
            >
              Register
            </LoadingButton>
          </Stack>

          <Typography>
            Already have an account{" "}
            <Link to="/sign-in" sx={{ cursor: "pointer" }}>
              {" "}
              <Typography variant="h5" color="primary">
                SIgn In
              </Typography>{" "}
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default SignUp;
