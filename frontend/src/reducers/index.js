import { combineReducers } from "redux";
import { bookReducer} from "./bookReducer";

const reducers = combineReducers({
  allBooks: bookReducer,
});

export default reducers;