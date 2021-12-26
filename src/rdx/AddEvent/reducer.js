import {
  CHANGE_DAILY_CURRENTDATE,
  CHANGE_WEEKLY_CURRENTDATE,
  CHANGE_MONTHLY_CURRENTDATE,
} from "./types";
const initialState = {
  dailyDate: new Date(),
  weeklyDate: new Date(),
  monthlyDate: new Date(),
};

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DAILY_CURRENTDATE:
      return {
        //...state,
        dailyDate: action.payload,
      };
    case CHANGE_WEEKLY_CURRENTDATE:
      return {
        //...state,
        weeklyDate: action.payload,
      };
    case CHANGE_MONTHLY_CURRENTDATE:
      return {
        //...state,
        monthlyDate: action.payload,
      };
    default:
      console.log(state);
      return state;
  }
};
export default dateReducer;
