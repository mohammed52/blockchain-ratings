import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
// import user from '../reducers/user';
// import topic from '../reducers/topic';
// import message from '../reducers/message';
import selectedOptions from "./selectedOptionsReducer";
import blockchainController from "./blockchainController";
// import * as types from '../types';

// Combine reducers with routeReducer which keeps track of
// router state
const appReducer = combineReducers({
	selectedOptions,
	routing,
	blockchainController
});

export default appReducer;
