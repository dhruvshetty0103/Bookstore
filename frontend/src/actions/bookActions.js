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