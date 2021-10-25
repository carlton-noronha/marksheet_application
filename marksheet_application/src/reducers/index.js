import marksheetReducer from "./marksheetReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	marksheets: marksheetReducer,
});

export default rootReducer;
