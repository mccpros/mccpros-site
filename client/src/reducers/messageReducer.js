import * as ActionTypes from '../constants/ActionTypes';

export default function info(state = { received: false }, action) { // Init with loading
  switch (action.type) {
    case ActionTypes.RECEIVE_MESSAGE:
      return {
        ...state,
        received: true,
      };

    default:
      return state;
  }
}
