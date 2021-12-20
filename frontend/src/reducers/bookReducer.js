/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : Redux book reducer
 * @file            : bookReducer.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import { ActionTypes } from "../constants/action-types";

const initialState = {
  books: [],
  filteredbooks: [],
  cartBooks: [],
  sortIndex: 0,
  pageNumber: 1,
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: payload };

    case ActionTypes.SET_FILTERED_BOOKS:
      return { ...state, filteredbooks: payload };

    case ActionTypes.SET_CART_BOOKS:
      return { ...state, cartBooks: payload };

    case ActionTypes.DELETE_CART_BOOK:
      let updatedCart = state.cartBooks.filter(
        (book) => book.book._id !== payload
      );
      return { ...state, cartBooks: updatedCart };

    case ActionTypes.UPDATE_CART_QUANTITY:
      let updatedCartQuantity = state.cartBooks.map((item) => {
        if (item.book._id === payload.book) {
          item.quantity = payload.quantity;
        }
        return item;
      });
      return { ...state, cartBooks: updatedCartQuantity };
      
    case ActionTypes.EMPTY_CART:
      return { ...state, cartBooks: [] };

    case ActionTypes.SET_SORT:
      return { ...state, sortIndex: payload };
  
    case ActionTypes.SET_PGNO:
      return { ...state, pageNumber: payload };  

    default:
      return state;
  }
};
