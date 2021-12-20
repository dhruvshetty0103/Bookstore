/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Order page
 * @file            : orderPage.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React from "react";
import { Redirect } from "react-router-dom";
import Appbar from "../components/Appbar";
import { Box } from "@mui/system";
import Order from "../components/order";

const OrderPage = () => {
  const token = sessionStorage.getItem("token");
  if (token == null) {
    return <>{<Redirect to="/login" />}</>;
  } else {
    return (
      <Box id="orderPageBox">
        <Appbar />
        <Box component="main" className="book-container">
          <Order />
        </Box>
      </Box>
    );
  }
};

export default OrderPage;