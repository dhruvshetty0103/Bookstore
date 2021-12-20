/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : cart component
 * @file            : cart.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import {
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartCard from "./cartCard";
import CustomerAddress from "./customerAddress";
import { Redirect } from "react-router-dom";
import bookService from "../service/bookService";
import { emptyCart } from "../actions/bookActions";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedSummary, setExpandedSummary] = React.useState(false);
  let total = 0;
  let numberOfBooks = 0;
  const myBooks = useSelector((state) => state.allBooks.cartBooks);
  const [success, setSuccess] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const handleExpanded = () => {
    setExpanded((prev) => !prev);
    setCheckout(true);
  };

  const handleExpandedSummary = () => {
    setExpandedSummary((prev) => !prev);
  };

  /***
   * @description function to checkout|order a book
   */
  const handleCheckout = () => {
    let data = {
      productList: [myBooks.map((item) => item.book._id)],
      totalPrice: total,
    };
    bookService
      .addOrder(data)
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("orderId", res.data.orderId);
          bookService
            .removeCart()
            .then(() => {
              dispatch(emptyCart());
            })
            .catch((err) => {
              console.log(err);
            });
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container>
      <Grid item container id="cartContainer">
        <Grid item xs={4}>
          <Typography style={{ marginBottom: "15px", fontSize: "20px" }}>
            My Cart({myBooks.length})
          </Typography>
        </Grid>
        <Grid item xs={8} />
        {myBooks.map((item, index) => {
          return <CartCard cart={true} item={item} key={index} />;
        })}

        {myBooks.length > 0 && (
          <Grid item xs={12} align="right">
            <Button variant="contained" onClick={handleExpanded}>
              Place order
            </Button>
          </Grid>
        )}
      </Grid>

      <CustomerAddress
        expanded={expanded}
        handleExpanded={handleExpanded}
        handleExpandedSummary={handleExpandedSummary}
      />

      <Grid item container id="cartContainer">
        <Grid item xs={12}>
          <Accordion
            elevation={0}
            expanded={expandedSummary}
            onChange={handleExpandedSummary}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Order Summary</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {myBooks.map((item, index) => {
                total += item.book.price * item.quantity;
                numberOfBooks += item.quantity;
                return <CartCard item={item} key={index} />;
              })}

              <Grid item xs={11} align="left" style={{ marginLeft: "35%" }}>
                <Typography>Number of books : {numberOfBooks}</Typography>
                <Typography>Total Price : {total}</Typography>
              </Grid>
              {myBooks.length > 0 && checkout && (
                <Grid item xs={12} align="right">
                  <Button variant="contained" onClick={handleCheckout}>
                    checkout
                  </Button>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      {success && <Redirect to="/order" />}
    </Grid>
  );
};

export default Cart;
