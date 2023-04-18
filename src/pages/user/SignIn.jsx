import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Paper,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { clearErrors, login } from "../../redux/actions/userActions";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const { loading, isAuthenticated, logError } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (logError) {
      setMessage(logError);
      clearErrors();
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, logError]);

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15vh",
      }}
    >
      <Paper sx={{ borderRadius: "10px", width: { md: "40%", xs: "100%" } }}>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            boxShadow: { xs: "none", md: 10 },

            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">Atlas Sign In</Typography>
          </div>
          {message && (
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography variant="h5">{message}</Typography>
              </Alert>
            </>
          )}
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ margin: "10px" }}
              label="Emial Address"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              sx={{ margin: "10px" }}
              label="Password"
              type="password"
              name="password"
              value={formData.password}
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
                sx={{ "&:focus": { outline: "none" }, width: "100%" }}
              >
                Sign In
              </LoadingButton>
            </Stack>
          </form>

          <Typography>
            Don't have an account{" "}
            <Link to="/sign-up" sx={{ cursor: "pointer" }}>
              {" "}
              <Typography variant="h6" color="secondary">
                Sign Up
              </Typography>{" "}
            </Link>
            <Link to="/forgot-password" sx={{ cursor: "pointer" }}>
              {" "}
              <Typography variant="h6" color="primary">
                Forgot Password
              </Typography>{" "}
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Signin;
