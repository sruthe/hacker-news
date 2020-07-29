import {REQUEST_APPS, RECEIVE_APPS, UPVOTE, HIDE} from './actions';

function hits( state = {isFetching: false, hits: [],pageNumber:1}, action) {
  switch (action.type) {
    case REQUEST_APPS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_APPS:
      return Object.assign({}, state, {
        isFetching: false,
        hits: action.hits,
        pageNumber: action.pageNumber
      });
    case UPVOTE:
      let hit=[...state.hits];
      hit[action.index]["points"]=hit[action.index]["points"]+1;
      let res={...state,
        isFetching: false,
        hits: hit,
        pageNumber: state.pageNumber
      };
      sessionStorage.setItem("page"+state.pageNumber, JSON.stringify(res));
      return res;
    case HIDE:
      let temp=[...state.hits];
      temp.splice(action.index,1);
     let resp= {
        ...state,
        isFetching: false,
        hits: temp,
        pageNumber: state.pageNumber
      };
      sessionStorage.setItem("page"+state.pageNumber, JSON.stringify(resp));
      return resp
    default:
      return state
  }
}

export default hits
