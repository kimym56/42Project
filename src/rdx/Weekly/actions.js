
import { CHANGE_W_STARTDATE, CHANGE_W_ENDDATE, CHANGE_W_CURRENTDATE} from "./types";

export const changeW_Startdate=(date)=> ({
  type: CHANGE_W_STARTDATE, payload: date
})
export const changeW_Enddate=(date)=> ({
  type: CHANGE_W_ENDDATE,
      payload: date,
})
export const changeW_Currentdate=(date)=> ({
  type: CHANGE_W_CURRENTDATE,
      payload: date,
})