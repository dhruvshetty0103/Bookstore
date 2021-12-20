/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : redux book actions
 * @file            : bookActions.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import { ActionTypes } from "../constants/action-types";

export const setBooks = (Books) => {
  return {
    type: ActionTypes.SET_BOOKS,
    payload: Books,
  };
};

export const setFilteredBooks = (Books) => {
  return {
    type: ActionTypes.SET_FILTERED_BOOKS,
    payload: Books,
  };
};
export const setCartBooks = (Books) => {
  return {
    type: ActionTypes.SET_CART_BOOKS,
    payload: Books,
  };
};

export const deleteCart = (Books) => {
  return {
    type: ActionTypes.DELETE_CART_BOOK,
    payload: Books,
  };
};

export const updateCartQuantity = (Books) => {
  return {
    type: ActionTypes.UPDATE_CART_QUANTITY,
    payload: Books,
  };
};

export const emptyCart = () => {
  return {
    type: ActionTypes.EMPTY_CART,
  };
};

export const setSort = (sortIndex) => {
  return {
      type: ActionTypes.SET_SORT,
      payload: sortIndex,
  };
};
export const setPgno = (pgNo) => {
  return {
      type: ActionTypes.SET_PGNO,
      payload: pgNo,
  };
};