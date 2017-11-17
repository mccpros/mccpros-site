import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `http://192.168.150.115:8080/wp-json${path}`
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

export function receiveHeroes(data) {
  return { type: types.RECEIVE_HEROES, heroes: data }; // Send info
}

export function receivePartners(data) {
  return { type: types.RECEIVE_PARTNERS, partners: data }; // Send info
}

export function receivePages(data) {
  return { type: types.RECEIVE_PAGES, pages: data }; // Send info
}

export function fetchInfo(data) {
  return dispatch => {
    dispatch(fetchingInfo()); // 'Loading...'

    // API Call
    axios.get(url('/'))
      .then(res => {
        dispatch(receiveInfo(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}

export function fetchHome(data) {
  let returnObj = {};

  return dispatch => {
    dispatch(fetchingHome()); // 'Loading...'

    // API Call
    axios.get(url('/wp/v2/home'))
      .then(res => {
        returnObj = res.data[0];
        return axios.get(url('/wp/v2/testimonial'));
      })
      .then(res => {
        returnObj.acf = { ...returnObj.acf, testimonials: res.data }
        dispatch(receiveHome(returnObj));
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}

export function fetchHeroes() {
  return dispatch => {
    // API Call
    axios.get(url('/wp/v2/superhero'))
      .then(res => {
        dispatch(receiveHeroes(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}

export function fetchPartners() {
  return dispatch => {
    // API Call
    axios.get(url('/wp/v2/partners'))
      .then(res => {
        dispatch(receivePartners(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}

export function fetchPages() {
  return dispatch => {
    // API Call
    axios.get(url('/wp/v2/custom_pages'))
      .then(res => {
        dispatch(receivePages(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      })
  };
}
