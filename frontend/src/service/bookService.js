/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Book Service
 * @file            : bookService.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import AxiosHelper from "../helper/axios";

/***
 * @description function to fetch  books
 * @param takes token, pageNo. and sort index
 * @returns response or err
 */
 const getBooks = (pageNo, token, sortId) => {
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/" +pageNo + "/" + sortId,
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to fetch cart books
 * @param takes token
 * @returns response or err
 */
const getCartBooks = (token) => {
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/cart",
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to add books to cart
 * @param takes data
 * @returns response or err
 */
const addCartBooks = (data) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/add-to-cart",
    headers: {
      authorization: `bearer ${token}`,
    },
    data: data,
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to fetch customer details
 * @returns response or err
 */
const getCustDetails = () => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/customer-details",
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to add customer details
 * @param takes data
 * @returns response or err
 */
const addCustDetails = (data) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/customer-details",
    headers: {
      authorization: `bearer ${token}`,
    },
    data: data,
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to remove cart books
 * @param takes product ID
 * @returns response or err
 */
const removeCartBook = (id) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "delete",
    url: "http://localhost:4000/books/cart/" + id,
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  console.log(reqobj.url);
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to search a book
 * @param takes search key
 * @returns response or err
 */
const searchBook = (searchVal) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/search",
    headers: {
      authorization: `bearer ${token}`,
    },
    data: searchVal,
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      console.log(response, " okay ");
      return response;
    })
    .catch((err) => {
      console.log(err, "eo");
      throw err;
    });
};

/***
 * @description function to add order details
 * @param takes data
 * @returns response or err
 */
const addOrder = (data) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/create-order",
    headers: {
      authorization: `bearer ${token}`,
    },
    data: data,
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

/***
 * @description function to remove cart details
 * @param takes cartID
 * @returns response or err
 */
const removeCart = (id) => {
  let token = sessionStorage.getItem("token");
  let reqobj = {
    method: "delete",
    url: "http://localhost:4000/books/cart/",
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getBooks,
  getCartBooks,
  getCustDetails,
  addCustDetails,
  addCartBooks,
  removeCartBook,
  searchBook,
  addOrder,
  removeCart,
};
