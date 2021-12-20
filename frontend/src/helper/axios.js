/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Axios file for backend integration
 * @file            : axios.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import axios from "axios";

/***
 * @description function to make a axios call with body
 * @param takes a request object
 * @returns the data or error
 */
const post = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers,
    data: requestObject.data,
  });
};

/***
 * @description function to make a axios call without body
 * @param takes a request object
 * @returns the data or error
 */
const get = (requestObject) => {
  return axios({
    method: requestObject.method,
    url: requestObject.url,
    headers: requestObject.headers
  });
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { post,get};
