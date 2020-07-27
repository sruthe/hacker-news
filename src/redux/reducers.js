import {REQUEST_APPS, RECEIVE_APPS, UPVOTE, HIDE} from './actions';

function hits( state = {isFetching: false, hits: []}, action) {
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
      let hit=state.hits;
      hit[action.index]["points"]=hit[action.index]["points"]+1;
      return Object.assign({}, state, {
        isFetching: false,
        hits: hit,
        pageNumber: state.pageNumber
      });
    case HIDE:
      let temp=[...state.hits];
      temp.splice(action.index,1);
      return {
        ...state,
        isFetching: false,
        hits: temp,
        pageNumber: state.pageNumber
      };
    default:
      return state
  }
}

export default hits
