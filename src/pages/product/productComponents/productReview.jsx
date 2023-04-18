import React, { useState, useEffect } from "react";
import { Button, Box, Stack, Rating, Typography, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  postProductReview,
} from "../../../redux/actions/productAction";
import { LoadingButton } from "@mui/lab";
function ProductReview({ product, id }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { reviews } = useSelector((state) => state.reviews);
  const { sending, success } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProductReviews(id));
    // if (error) {
    //   console.log(error);
    //   dispatch(clearErrors());
    // }
  }, [dispatch, id, success]);
  const handleRating = (e, newValue) => {
    setRating(newValue);
  };

  const toggleView = (view) => {
    setState((prev) => (prev ? false : true));
  };
  const handlePostReview = (e) => {
    e.preventDefault();
    const formData = {
      rating: rating,
      comment: comment,
      productId: id,
    };
    dispatch(postProductReview(formData));
    setRating(0);
    setComment("");
  };
  return (
    <Box className="row px-xl-5">
      <Box className="col" sx={{ border: "1px solid" }}>
        <div className="bg-light p-30">
          <div className="nav nav-tabs mb-4">
            <Button
              variant={state ? "contained" : ""}
              onClick={() => {
                toggleView(true);
              }}
              sx={{ "&:focus": { outline: "none" } }}
            >
              Reviews ({product?.product?.numberOfReviews})
            </Button>
            <Button
              sx={{ "&:focus": { outline: "none" } }}
              onClick={() => {
                toggleView(false);
              }}
              variant={!state ? "contained" : ""}
            >
              Description
            </Button>
          </div>

          <div className="tab-content">
            {state ? (
              <Box>
                <div className="row">
                  <div className="col-md-6">
                    {reviews && (
                      <h4 className="mb-4">
                        {`${reviews.length} review(s) for ${product?.product?.name}`}
                      </h4>
                    )}
                    <Box
                      sx={{
                        backgroundColor: "rgb(224, 250, 250)",
                        borderRadius: "10px",
                        padding: "5px",
                        maxHeight: "35vh",
                        overflowY: "scroll",
                      }}
                    >
                      {reviews &&
                        reviews.map((rev) => (
                          <>
                            <div className="media mb-4">
                              <div className="media-body">
                                <h6>
                                  {rev.name}
                                  <small> </small>
                                </h6>
                                <Stack spacing={2}>
                                  <Rating
                                    value={rev.rating}
                                    precision={0.5}
                                    size="small"
                                    readOnly
                                  />
                                </Stack>
                                <Typography>{rev.comment}</Typography>
                              </div>
                            </div>
                            <Divider />
                          </>
                        ))}
                    </Box>
                  </div>

                  {user ? (
                    <div className="col-md-6">
                      <h4 className="mb-4">Leave a review</h4>

                      <Stack spacing={2}>
                        <Rating
                          value={rating}
                          onChange={handleRating}
                          precision={0.5}
                          size="small"
                        />
                      </Stack>
                      <form>
                        <div className="form-group">
                          <label htmlFor="message">Your Review *</label>
                          <textarea
                            id="message"
                            cols="30"
                            rows="5"
                            className="form-control"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>

                        <LoadingButton
                          onClick={handlePostReview}
                          variant="contained"
                          loading={sending ? true : false}
                          sx={{
                            "&:focus": { outline: "none" },
                            width: "30vw",
                            background: "rgb(24, 104, 183)",
                          }}
                        >
                          post
                        </LoadingButton>
                      </form>
                    </div>
                  ) : (
                    <Box>
                      Sign In to leave a review
                      <Link to="/sign-in">Sign In</Link>
                    </Box>
                  )}
                </div>
              </Box>
            ) : (
              <Box>
                <Typography variant="h4">Product Description</Typography>
                <Typography variant="body1">
                  {product?.product?.description}
                </Typography>
              </Box>
            )}
          </div>
        </div>
      </Box>
      {/* <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <SnackbarAlert>
          <Typography>Out of stock</Typography>
        </SnackbarAlert>
      </Snackbar>

      <Snackbar open={cart} autoHideDuration={4000} onClose={handleClose2}>
        <SnackbarAlert2>
          <Typography>Item Added to cart</Typography>
        </SnackbarAlert2>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={4000} onClose={handleClose2}>
        <SnackbarAlert2>
          <Typography>Posted</Typography>
        </SnackbarAlert2>
      </Snackbar> */}
    </Box>
  );
}

export default ProductReview;
