import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `http://localhost:8080${path}`
}

export function fetchingInfo(data) {
  return { type: types.FETCHING_INFO }; // Send 'Loading'
}

export function receiveInfo(data) {
  return { type: types.RECEIVE_INFO, info: data }; // Send info
}

export function fetchInfo(data) {
  return dispatch => {
    dispatch(fetchingInfo()); // 'Loading...'

    // API Call
    axios.get(url('/wp-json'))
      .then(res => {
        dispatch(receiveInfo(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}
