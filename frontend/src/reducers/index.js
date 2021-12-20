/* ************************************************************************
 * Execution        : cmd> node index.js
 * @descrition      : combined reducer for redux
 * @file            : index.jsx
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
import { combineReducers } from "redux";
import { bookReducer} from "./bookReducer";

const reducers = combineReducers({
  allBooks: bookReducer,
});

export default reducers;