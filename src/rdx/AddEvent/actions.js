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


import { CHANGE_STARTDATE, CHANGE_ENDDATE, CHANGE_CURRENTDATE} from "./types";

export const changeStartdate=(date)=> ({
  type: CHANGE_STARTDATE, payload: date
})
export const changeEnddate=(date)=> ({
  type: CHANGE_ENDDATE,
      payload: date,
})
export const changeCurrentdate=(date)=> ({
  type: CHANGE_CURRENTDATE,
      payload: date,
})