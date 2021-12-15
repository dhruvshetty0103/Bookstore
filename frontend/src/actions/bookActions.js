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