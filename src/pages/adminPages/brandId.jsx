import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getBrandId } from "../../redux/actions/brandAction";
import { useDispatch, useSelector } from "react-redux";
function BrandId({ id }) {
  const dispatch = useDispatch();
  const { brandId } = useSelector((state) => state.brandId);
  useEffect(() => {
    dispatch(getBrandId(id));
  }, [dispatch, id]);
  return (
    <>
      {brandId && (
        <Typography sx={{ border: "1px solid red", borderRadius: "10px" }}>
          {brandId}
        </Typography>
      )}
    </>
  );
}

export default BrandId;
