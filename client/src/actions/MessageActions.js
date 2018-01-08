import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `/api${path}`;
}

export function receiveMessage() {
  return { type: types.RECEIVE_MESSAGE }; // Send 'Loading'
}

export function postMessage(data) {
  return dispatch => {
    // API Call
    axios.post(url('/message'), data)
      .then(res => {
        dispatch(receiveMessage()); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}
