import { combineReducers } from "redux";
// Import your individual reducers here
import someReducer from "./somereducers"; // Example reducer

const rootReducer = combineReducers({
  some: someReducer, // Add your reducers here
  // other reducers can go here
});

export default rootReducer;
