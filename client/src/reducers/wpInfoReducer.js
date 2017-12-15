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
    case ActionTypes.RECEIVE_HEROES:
      return {
        ...state,
        heroes: action.heroes // Got em
      };
    case ActionTypes.RECEIVE_PARTNERS:
      return {
        ...state,
        partners: action.partners // Got em
      };
    case ActionTypes.RECEIVE_PAGES:
      return {
        ...state,
        pages: action.pages // Got em
      };
    case ActionTypes.RECEIVE_ONE_PAGE:
      return {
        ...state,
        page: action.page // Got em
      };
    case ActionTypes.RECEIVE_TESTIMONIALS:
      return {
        ...state,
        testimonials: action.testimonials // Got em
      };
    default:
      return state;
  }
}
