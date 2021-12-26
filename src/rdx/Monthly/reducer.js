import {CHANGE_M_STARTDATE, CHANGE_M_ENDDATE, CHANGE_M_CURRENTDATE} from './types'


const initialState = {
    
    wstartDate: new Date(),
    wendDate: new Date(),
    wcurrentDate: new Date(),
  };

  export const monthlyReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_M_STARTDATE:
        return {
          ...state,
          mstartDate: action.payload,
        };
      case CHANGE_M_ENDDATE:
        return {
          ...state,
          mendDate: action.payload,
        };
        case CHANGE_M_CURRENTDATE:
          return {
            ...state,
            mcurrentDate: action.payload,
          };
      default:
        return state;
    }
  };
  export default monthlyReducer;