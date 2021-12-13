import React, { useState } from "react";
import { Typography, Grid, IconButton, Divider } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const CartCard = ({ cart, item }) => {
  const [count, setCount] = useState(item.quantity);
  return (
    <Grid item container padding={1}>
      <Grid item xs={4}>
        <img
          className="bookImage"
          src={item.book.image}
          alt=""
          
        />
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
            <IconButton onClick={() => setCount((prev) => prev - 1)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <button style={{ border: "1px solid black", width: "30px" }}>
              {count}
            </button>
            <IconButton onClick={() => setCount((prev) => prev + 1)}>
              <AddCircleOutlineIcon />
            </IconButton>
            <span>remove</span>
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