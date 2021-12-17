import React,{useEffect} from "react";
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
  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchitem = () => {
    if(token !== null){
      bookService
      .getBooks(1,token)
      .then((res) => {
        dispatch(setBooks(res.data));
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
          <Book/>
        </Box>
      </Box>
    );
  }
};

export default Dashboard;