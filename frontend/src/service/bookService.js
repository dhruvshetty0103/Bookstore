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
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getBooks };