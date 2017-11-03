import * as ActionTypes from '../constants/ActionTypes';

export default function info(state = { loading: true }, action) { // Init with loading
  switch (action.type) {
    case ActionTypes.FETCHING_INFO:
      return {
        ...state,
        loading: true, // 'Loading'
      };
    case ActionTypes.RECEIVE_INFO:
      return {
        ...state,
        loading: false,
        data: action.info // Got em
      };
    case ActionTypes.FETCHING_HOME:
      return {
        ...state,
        loading: true, // 'Loading'
      };
    case ActionTypes.RECEIVE_HOME:
      return {
        ...state,
        loading: false,
        home: action.home // Got em
      };
    default:
      return state;
  }
}
