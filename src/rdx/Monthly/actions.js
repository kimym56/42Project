
import { CHANGE_M_STARTDATE, CHANGE_M_ENDDATE, CHANGE_M_CURRENTDATE} from "./types";

export const changeM_Startdate=(date)=> ({
  type: CHANGE_M_STARTDATE, payload: date
})
export const changeM_Enddate=(date)=> ({
  type: CHANGE_M_ENDDATE,
      payload: date,
})
export const changeM_Currentdate=(date)=> ({
  type: CHANGE_M_CURRENTDATE,
      payload: date,
})