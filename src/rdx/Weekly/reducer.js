import {CHANGE_W_STARTDATE, CHANGE_W_ENDDATE, CHANGE_W_CURRENTDATE} from './types'


const initialState = {
    
    wstartDate: new Date(),
    wendDate: new Date(),
    wcurrentDate: new Date(),
  };

  export const weeklyReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_W_STARTDATE:
        return {
          ...state,
          wstartDate: action.payload,
        };
      case CHANGE_W_ENDDATE:
        return {
          ...state,
          wendDate: action.payload,
        };
        case CHANGE_W_CURRENTDATE:
          return {
            ...state,
            wcurrentDate: action.payload,
          };
      default:
        return state;
    }
  };
  export default weeklyReducer;