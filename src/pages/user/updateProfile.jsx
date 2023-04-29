import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";

import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
  CircularProgress,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link, redirect } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import { states } from "../../utils/stateData";
import { baseUrl, origin } from "../../urls";
import store from "../../redux/store";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { error, isUpdated, updating } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setemail] = useState("");
  const [location, setLocation] = useState("");
  // const [course, setCourse] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [updatingInfo, setUpdatingInfo] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_Avater.png"
  );
  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }
    if (user) {
      // setName(user?.name);
      setemail(user?.email);
      // setCourse(user?.courseOfStudy);
      setLocation(user?.location);
      setAvatarPreview(user?.avatar?.url);
    }
    if (user.requested) {
      setBank(user?.bank);
      setAccountName(user?.accountName);
      setAccountNumber(user?.accountNumber);
      setPhoneNumber(user?.phoneNumber);
    }
    if (isUpdated) {
      setOpen(true);
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [user, navigate, error, dispatch, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    // formData.append("campus", location);
    // formData.append("course", course);
    formData.append("avatar", avatar);
    formData.append("user", user.id);

    // dispatch(updateProfile(formData));

    setUpdatingInfo(true)

    fetch(`${origin}/${baseUrl}/accounts/user/update`, {
      method: "PUT",
      body: formData
    }).then(response => {
      if (response.status === 200) {
        setSnackbar(true)
        store.dispatch(loadUser())
        navigate("/me")
      } else {
        setUpdatingInfo(false)
      }
    })

  };

  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {loading ? (
        <Container
          fixed
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Stack direction="column" spacing={1}>
          <Typography variant="h3">Update Profile</Typography>
          {Message && (
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography>{Message}</Typography>
              </Alert>
            </>
          )}
          <TextField
            label="first name"
            type="text"
            name="first name"
            onChange={(e) => setFirstname(e.target.value)}
          />

          <TextField
            label="last name"
            type="text"
            name="last name"
            onChange={(e) => setLastname(e.target.value)}
          />

          {/* <TextField
            label="Email Address"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          /> */}
          {/* <TextField
            label="Campus"
            name="campus"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
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
          </FormControl> */}

          {user && user.requested && (
            <>
              <TextField
                sx={{ margin: "10px" }}
                label="Bank Name"
                name="bank"
                type="text"
                value={bank}
                onChange={handleChange}
                required
              />

              <TextField
                sx={{ margin: "10px" }}
                label="Account Number"
                type="text"
                name="accountNumber"
                value={accountNumber}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Account Name"
                type="text"
                name="accountName"
                value={accountName}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                required
              />
            </>
          )}
          <Stack direction="row" spacing={2}>
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="images/*"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </Stack>
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
              loading={updatingInfo}
              sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
            >
              Update Profile
            </LoadingButton>
          </Stack>

          <Snackbar open={snackbar} autoHideDuration={4000} onClose={() => setSnackbar(false)}>
            <SnackbarAlert>
              <Typography>profile updated</Typography>
            </SnackbarAlert>
          </Snackbar>
        </Stack>
      )}
    </Box>
  );
}

export default UpdateProfile;
