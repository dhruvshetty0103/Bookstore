import { ActionTypes } from "../constants/action-types";

const initialState = {
  books: [],
  filteredbooks: [],
  cartBooks:[]
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: payload };

    case ActionTypes.SET_FILTERED_BOOKS:
      return { ...state, filteredbooks: payload };

    case ActionTypes.SET_CART_BOOKS:
      return { ...state, cartBooks: payload };

    default:
      return state;
  }
};