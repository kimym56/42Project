//근데 dispatch 할 때 {type: ~} 이런식으로 바로 넘겨주니까 이 부분 필요없나
/*
import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from "./types";

export const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER,
  };
};

export const removeSubscriber = () => {
  return {
    type: REMOVE_SUBSCRIBER,
  };
};
*/

//but payload 존재
/*
import { CHANGE_STARTDATE, CHANGE_ENDDATE } from "./types";

export function changeStartdate(date) {
  return (dispatch) => {
    
    //type: CHANGE_STARTDATE,
    //payload: date,
    
    //payload:new Date(date)?
    dispatch({ type: CHANGE_STARTDATE, payload: date });
  };
}

export function changeEnddate(date) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ENDDATE,
      payload: date,
    });
  };
}

*/

import {
  CHANGE_DAILY_CURRENTDATE,
  CHANGE_WEEKLY_CURRENTDATE,
  CHANGE_MONTHLY_CURRENTDATE,
} from "./types";

export const changeMonthlyCurrentDate = (date) => ({
  type: CHANGE_MONTHLY_CURRENTDATE,
  payload: date,
});
export const changeDailyCurrentDate = (date) => ({
  type: CHANGE_DAILY_CURRENTDATE,
  payload: date,
});
export const changeWeeklyCurrentDate = (date) => ({
  type: CHANGE_WEEKLY_CURRENTDATE,
  payload: date,
});
