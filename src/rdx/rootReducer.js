import { combineReducers } from "redux";

//import subscribersReducer from "./subscribers/reducer";
//import viewsReducer from "./views/reducer";
//import commentsReducer from "./comments/reducer";

import dateReducer from "./AddEvent/reducer";

/*
const rootReducer = combineReducers({
    //views: viewsReducer,
    //subscribers: subscribersReducer,
    
    dates:dateReducer
  });
*/
const rootReducer = combineReducers({ dateReducer });
export default rootReducer;
