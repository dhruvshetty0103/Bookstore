/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : cart card component
 * @file            : cartCard.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React from "react";
import { Typography, Grid, IconButton, Divider, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../styles/home.scss";
import bookService from "../service/bookService";
import { useDispatch } from "react-redux";
import { deleteCart, updateCartQuantity } from "../actions/bookActions";

const CartCard = ({ cart, item }) => {
  let count = item.quantity;
  const dispatch = useDispatch();

  /***
   * @description function to update book count in cart
   */
  const handleUpdate = (type) => {
    let data = {
      book: item.book._id,
      quantity: item.quantity,
      cost: item.cost,
      counter: type,
    };
    bookService
      .addCartBooks(data)
      .then((res) => {
        if (type === "increment") {
          count++;
        } else {
          count--;
        }
        dispatch(updateCartQuantity({ book: item.book._id, quantity: count }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /***
   * @description function to delete a book from cart
   * @param takes book Id
   */
  const handleDelete = () => {
    bookService
      .removeCartBook(item.book._id)
      .then((res) => {
        dispatch(deleteCart(item.book._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid item container padding={1}>
      <Grid item xs={4}>
        <img className="bookImage" src={item.book.image} alt="" />
      </Grid>
      <Grid item xs={8}>
        <div style={{ marginLeft: "10px" }}>
          <Typography align="left">{item.book.title}</Typography>
          <Typography
            align="left"
            color="text.secondary"
            style={{ fontSize: "14px" }}
          >
            by {item.book.author}
          </Typography>
          <Typography
            align="left"
            style={{ fontWeight: "bold", fontSize: "14px" }}
          >
            Rs {item.book.price}
          </Typography>
        </div>

        {cart && (
          <Typography
            align="left"
            style={{ marginTop: "5px", marginLeft: "0px" }}
          >
            <IconButton
              onClick={() => handleUpdate("decrement")}
              disabled={count <= 1 ? true : false}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <button style={{ border: "1px solid black", width: "30px" }}>
              {count}
            </button>
            <IconButton onClick={() => handleUpdate("increment")}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Button
              onClick={handleDelete}
              style={{ textTransform: "none", color: "black" }}
            >
              Remove
            </Button>
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default CartCard;
