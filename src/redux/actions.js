export const REQUEST_APPS = 'REQUEST_APPS'
export const RECEIVE_APPS = 'RECEIVE_APPS'
export const UPVOTE = 'UPVOTE'

function requestApps() {
  return {
    type: REQUEST_APPS
  }
}

function receiveApps(json, page) {
  return {
    type: RECEIVE_APPS,
    hits: json,
    pageNumber: page
  }
}

function upvoteIndex(index) {
  return {
    type: UPVOTE,
    index: index
  }
}

function fetchApps(page) {
  console.log("in fetchapps , pagenumber ",page)
  return dispatch => {
    dispatch(requestApps())
    return fetch("https://hn.algolia.com/api/v1/search?page="+page)
      .then(response => response.json())
      .then(json => dispatch(receiveApps(json.hits, json.page)))
  }
}

function shouldFetchApps(state) {
  console.log(state);
  let {hits=[]} = state;
  if (hits.length==0) {
    return true
  } else if (state.isFetching) {
    return false
  }
}

export function fetchAppsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps(1))
    }
  }
}

export function getPageData(pageNumber) {
  return (dispatch) => {
      return dispatch(fetchApps(pageNumber))

  }
}

export function upvote(index) {
  return (dispatch) => {
      return dispatch(upvoteIndex(index))
    }
}
