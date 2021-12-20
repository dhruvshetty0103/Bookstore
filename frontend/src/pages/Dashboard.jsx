/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Dashboard page
 * @file            : dashBoard.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import React,{useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Book from "../components/book";
import Appbar from "../components/Appbar";
import { Box } from "@mui/system";
import bookService from "../service/bookService";
import {setBooks} from "../actions/bookActions"
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [count,setCount] = useState(0);
  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***
   * @description function to fetch books
   * @param takes token
   * @returns the books
   */
  const fetchitem = () => {
    if(token !== null){
      bookService
      .getBooks(1,token)
      .then((res) => {
        setCount(res.data.count)
        dispatch(setBooks(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  if (token == null) {
    return <>{<Redirect to="/login" />}</>;
  } else {
    return (
      <Box id="dashboardBox">
        <Appbar />
        <Box component="main" className="book-container">
          <Book count ={count} />
        </Box>
      </Box>
    );
  }
};

export default Dashboard;