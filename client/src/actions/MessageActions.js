import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `/api${path}`;
}

export function receiveMessage(data) {
  return { type: types.FETCHING_INFO }; // Send 'Loading'
}

export function postMessage(data) {
  return dispatch => {
    // API Call
    axios.post(url('/message'), data)
      .then(res => {
        // dispatch(receiveInfo(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}
