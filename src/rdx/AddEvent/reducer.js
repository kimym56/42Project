import {CHANGE_STARTDATE, CHANGE_ENDDATE} from './types'


const initialState = {
    
    startDate: new Date(),
    endDate: new Date(),
  };

  export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_STARTDATE:
        return {
          ...state,
          startDate: action.payload,
        };
      case CHANGE_ENDDATE:
        return {
          ...state,
          endDate: action.payload,
        };
      default:
        return state;
    }
  };
  export default dateReducer;