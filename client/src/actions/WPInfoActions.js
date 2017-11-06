import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `http://localhost:8080/wp-json${path}`
}

export function fetchingInfo(data) {
  return { type: types.FETCHING_INFO }; // Send 'Loading'
}

export function receiveInfo(data) {
  return { type: types.RECEIVE_INFO, info: data }; // Send info
}

export function fetchingHome(data) {
  return { type: types.FETCHING_HOME }; // Send 'Loading'
}

export function receiveHome(data) {
  return { type: types.RECEIVE_HOME, home: data }; // Send info
}

export function fetchInfo(data) {
  return dispatch => {
    dispatch(fetchingInfo()); // 'Loading...'

    // API Call
    // axios.get(url('/'))
    //   .then(res => {
        dispatch(receiveInfo({})); // Got em
      // })
      // .catch(err => {
      //   console.log('err', err);
      // })
  };
}

export function fetchHome(data) {
  return dispatch => {
    dispatch(fetchingHome()); // 'Loading...'

    // API Call
    // axios.get(url('/wp/v2/home'))
    //   .then(res => {
        dispatch(receiveHome({})); // Got em
      // })
      // .catch(err => {
      //   console.log('err', err);
      // })
  };
}
