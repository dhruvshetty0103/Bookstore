/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Book component
 * @file            : book.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import bookService from "../service/bookService";
import { setBooks } from "../actions/bookActions";
import BookCard from "./bookCard";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  ul: {
    "& .Mui-selected": {
      color: "white",
      backgroundColor: "brown",
    },
  },
}));

const Book = ({count}) => {
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const myBooks = useSelector((state) => state.allBooks.filteredbooks);
  const pageNo = useSelector((state) => state.allBooks.pageNumber);
  const sortIndex = useSelector((state) => state.allBooks.sortIndex);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /***
   * @description open and close function for the menu
   * @param takes an event
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /***
   * @description function to fetch books
   * @param takes page no. , token and sort index
   * @returns list of books
   */
   useEffect(() => {
    bookService
      .getBooks(pageNo, token, sortIndex)
      .then((res) => {
        dispatch(setFilteredBooks(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortIndex]);

  /***
   * @description function to paginate to different pages
   * @param takes a page no.
   */
  const handlePagination = (index) => {
    bookService
      .getBooks(index, token, sortIndex)
      .then((res) => {
        dispatch(setFilteredBooks(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setPgno(index));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /***
   * @description function to sort a book
   * @param take a integer -1 for ascending and 1 for descending
   */
  const handleDisplayOrder = (order) => {
    if (order === "low") {
      handleClose();
      dispatch(setSort(-1));
    } else {
      handleClose();
      dispatch(setSort(1)); 
    }
  };

  return (
    <Box className="main-container">
      <Grid container>
        <Grid item xs={6} align="left">
          <Typography id="book-count">
            Books
            <span id="book-count-span">({count} items)</span>
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Button
            id="sort-by-btn"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Sort by price
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleDisplayOrder("low")}>
              price: low to high
            </MenuItem>
            <MenuItem onClick={() => handleDisplayOrder("high")}>
              price: high to low
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {myBooks.map((item, index) => {
          return <BookCard item={item} key={index} />;
        })}
      </Grid>

      <div id="pagination">
        <Pagination
          count={5}
          shape="rounded"
          classes={{ ul: classes.ul }}
          onChange={(event, page) => handlePagination(page)}
          style={{ margin: "20px auto" }}
        />
      </div>
    </Box>
  );
};

export default Book;
