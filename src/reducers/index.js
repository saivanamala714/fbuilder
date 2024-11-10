const reducer = (state = {}, action) => {
  switch (action.type) {
     case 'GET_NEWS':
        return { ...state, loading: true };
        case 'NEWS_RECEIVED':
           return { ...state, data: action.payload};
     default:
        return state;
   }
};
export default reducer;
