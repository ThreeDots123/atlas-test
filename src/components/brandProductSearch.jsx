import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBrandProducts } from "../redux/actions/brandAction";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  borderColor: "transparent",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  border: "2px solid rgb(101, 100, 100)",

  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  height: "48px",
}));

export default function BrandProductSearch({ id, dispatch, setSearchQuery }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      const newSearch = search.trim();
      navigate(`/products?search=${newSearch}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    console.log(e);
    if (e.charCode === 13) {
      //search post
      e.preventDefault();

      const newSearch = search.trim();
      dispatch(getBrandProducts(id, newSearch));
      setSearchQuery(true);
      setSearch("");
    }
  };
  return (
    <Search className="search">
      <FormControl onKeyPress={handleKeyPress} onSubmit={handleSearchSubmit}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onKeyPress={handleKeyPress}
          onSubmit={handleSearchSubmit}
          placeholder="Search Plug, store and customers"
          name="search"
          value={search}
          onChange={handleChange}
          inputProps={{
            "aria-label": "search",
            onkeypress: `${handleKeyPress}`,
          }}
        />
      </FormControl>
    </Search>
  );
}
