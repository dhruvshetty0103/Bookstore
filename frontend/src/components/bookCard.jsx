/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Book Card component
 * @file            : bookCard.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React, { useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import bookService from "../service/bookService";
const BookCard = ({ item }) => {
  const [wishlist, setWishlist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(false);

  /***
   * @description function to add a book into the cart
   */
  const handleCart = () => {
    let data = {
      book: item._id,
      quantity: item.quantity,
      cost: item.price,
      counter: "increment",
    };

    /***
   * @description function to wishist a book 
   */
    setWishlist(true);
    bookService
      .addCartBooks(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishlist = () => {
    setCart(true);
  };

  const [over, setOver] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{ height: 345 }}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        elevation={over ? 10 : 4}
      >
        <div className="imageContainer" onClick={() => setIsOpen(true)}>
          <img className="bookImage" src={item.image} alt="" />
        </div>

        <CardContent onClick={() => setIsOpen(true)}>
          <Typography align="left" className="item-content">
            {item.title}
          </Typography>
          <Typography
            align="left"
            color="text.secondary"
            style={{ fontSize: "14px" }}
          >
            by {item.author}
          </Typography>
          <Typography
            align="left"
            style={{ fontWeight: "bold", fontSize: "14px" }}
          >
            Rs. {item.price}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            onClick={handleCart}
            style={
              !cart && wishlist
                ? { background: "#3371B5", color: "white", width: "100%" }
                : !cart
                ? { backgroundColor: "#A03037", color: "white", width: "100%" }
                : { display: "none" }
            }
          >
            {!cart && wishlist ? "Added to bag" : "Add to bag"}
          </Button>
          <Button
            style={
              !wishlist
                ? { border: "1px solid black", color: "black", width: "100%" }
                : { display: "none" }
            }
            onClick={handleWishlist}
          >
            Wishlist
          </Button>
        </CardActions>
      </Card>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>{item.title}</DialogTitle>
        <DialogContent>{item.description}</DialogContent>
      </Dialog>
    </Grid>
  );
};

export default BookCard;
