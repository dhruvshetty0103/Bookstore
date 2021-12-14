import AxiosHelper from "../helper/axios";

const getBooks = (index) => {
  let token = localStorage.getItem('token')
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/"+index,
    headers: {
      authorization: `bearer ${token}`,
    }
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

const getCartBooks = () => {
  let token = localStorage.getItem('token')
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/cart",
    headers: {
      authorization: `bearer ${token}`,
    }
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

const addCartBooks = (data) => {
  let token = localStorage.getItem('token')
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/add-to-cart",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};


const getCustDetails = () => {
  let token = localStorage.getItem('token')
  let reqobj = {
    method: "get",
    url: "http://localhost:4000/books/customer-details",
    headers: {
      authorization: `bearer ${token}`,
    }
  };
  return AxiosHelper.get(reqobj)
    .then((response) => {
      console.log(response,"this some ");
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

const addCustDetails = (data) => {
  let token = localStorage.getItem('token')
  let reqobj = {
    method: "post",
    url: "http://localhost:4000/books/customer-details",
    headers: {
      authorization: `bearer ${token}`,
    },
    data:data
  };
  return AxiosHelper.post(reqobj)
    .then((response) => {
      console.log(response," okay ");
      return response;
    })
    .catch((err) => {
      console.log(err,"eo");
      throw err;
    });
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getBooks,getCartBooks,getCustDetails,addCustDetails,addCartBooks };