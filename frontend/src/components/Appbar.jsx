/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : App bar component
 * @file            : AppBar.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {Toolbar,Typography,IconButton} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import "../styles/home.scss";
import { useSelector } from "react-redux";
import { setFilteredBooks, setSort} from "../actions/bookActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import bookService from "../service/bookService";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#A03037",
}));

const Appbar = () => {
  
  const myBooks = useSelector((state) => state.allBooks.books);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(setFilteredBooks(myBooks));  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBooks]);

  /***
   * @description function to search a book 
   * @param takes a 3 0r more letter string
   * @returns list of matched books
   */
  const handleSearch = (searchValue) => {
    if (searchValue.length >= 3) {
      dispatch(setSort(0));
      bookService
        .searchBook({ searchTxt: searchValue })
        .then((res) => {
          dispatch(setFilteredBooks(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setFilteredBooks(myBooks));
    }
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          style={{ marginLeft: "5%" }}
          component={Link}
          to="/Dashboard"
        >
          <ImportContactsIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" id="book-title">
          BookStore
        </Typography>
        <div id="searchDiv">
          <SearchIcon id="search-icon" />
          <input
            type="text"
            placeholder="Search…"
            id="search-bar"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Typography variant="h6" id="cart-title">
          Cart
        </Typography>
        <IconButton
          style={{ color: "white", marginRight: "6%" }}
          component={Link}
          to="/cart"
        >
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
