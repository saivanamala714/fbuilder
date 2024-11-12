import { GET_LATEST_OPTION_INFO, LATEST_OPTION_INFO, GET_HISTORICAL_OPTION_INFO, HISTORICAL_OPTION_INFO } from '../constants/actionTypes';
const INIT_STATE = { latestOptionInfo: [], historicalOptionInfo: [] }

const reducer = (state = {}, action) => {
   switch (action.type) {
      case GET_LATEST_OPTION_INFO:
         return { ...state, loading: true , latestOptionInfo: []};
      case LATEST_OPTION_INFO:
         return { ...state, latestOptionInfo: action.payload };
      case GET_HISTORICAL_OPTION_INFO:
         return { ...state, loading: true, historicalOptionInfo: [] };
      case HISTORICAL_OPTION_INFO:
         return { ...state, historicalOptionInfo: action.payload };
      default:
         return state;
   }
};
export default reducer;
