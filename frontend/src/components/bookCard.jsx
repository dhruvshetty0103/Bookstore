import React, { useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import bookService from "../service/bookService";
const BookCard = ({ item }) => {
  const [wishlist, setWishlist] = useState(false);
  const [cart, setCart] = useState(false);
  const handleCart = () => {
    let data = {
      book:item._id,
      quantity:item.quantity,
      cost:item.price
    }
    setWishlist(true);
    bookService.addCartBooks(data)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const handleWishlist = () => {
    setCart(true);
  };

  return (
    <Card sx={{ height: 345 }}>
      <div className="imageContainer">
        <img className="bookImage" src={item.image} alt="" />
      </div>
      <CardContent>
        <Typography align="left" style={{ fontSize: "16px" }}>
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
      <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={handleCart}
          fullWidth="true"
          style={
            !cart
              ? { backgroundColor: "#A03037", color: "white" }
              : { display: "none" }
          }
        >
          Add to bag
        </Button>
        <Button
          style={
            !wishlist
              ? { border: "1px solid black", color: "black" }
              : { display: "none" }
          }
          fullWidth="true"
          onClick={handleWishlist}
        >
          Wishlist
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;