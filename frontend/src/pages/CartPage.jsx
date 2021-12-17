import React, { useEffect} from "react";
import { Redirect } from "react-router-dom";
import Cart from "../components/cart";
import Appbar from "../components/Appbar";
import { Box } from "@mui/system";
import bookService from "../service/bookService";
import { setCartBooks } from "../actions/bookActions";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const token = sessionStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchitem = () => {
    bookService
    .getCartBooks(token)
      .then((res) => {
        dispatch(setCartBooks(res.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (token == null) {
    return <>{<Redirect to="/login" />}</>;
  } else {
    return (
      <Box id="cartPageBox">
        <Appbar />
        <Box component="main" className="book-container">
          <Cart />
        </Box>
      </Box>
    );
  }
};

export default CartPage;