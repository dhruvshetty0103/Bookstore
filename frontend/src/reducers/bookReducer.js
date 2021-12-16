import { ActionTypes } from "../constants/action-types";

const initialState = {
  books: [],
  filteredbooks: [],
  cartBooks:[],
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
        let updatedCartQuantity = state.cartBooks.map((item)=>{
          if( item.book._id === payload.book){
            item.quantity = payload.quantity
          }
          return item
        });
        return { ...state, cartBooks: updatedCartQuantity };

    default:
      return state;
  }
};