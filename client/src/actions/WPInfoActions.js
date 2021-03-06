import * as types from '../constants/ActionTypes';
import axios from 'axios';

function url(path) {
  return `https://mccpros.com:8443/wp-json${path}`;
}

function cpurl(path) {
  return `/api/content${path}`;
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

export function receiveTestimonials(data) {
  return { type: types.RECEIVE_TESTIMONIALS, testimonials: data }; // Send info
}

export function fetchingOnePage() {
  return { type: types.FETCHING_ONE_PAGE, page: {} }; // Send 'Loading'
}

export function receiveOnePage(data) {
  return { type: types.RECEIVE_ONE_PAGE, page: data }; // Send info
}

export function fetchHome(data) {
  let returnObj = {};

  return dispatch => {
    dispatch(fetchingHome()); // 'Loading...'

    // API Call
    axios
      .get(cpurl('/homePage'))
      .then(res => {
        returnObj = res.data[0];
        return axios.get(cpurl('/testimonials'));
      })
      .then(res => {
        returnObj = { ...returnObj, testimonials: res.data };
        dispatch(receiveHome(returnObj));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function fetchTestimonials() {
  return dispatch => {
    // API Call
    axios
      .get(cpurl('/testimonials'))
      .then(res => {
        dispatch(receiveTestimonials(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function fetchHeroes() {
  return dispatch => {
    // API Call
    axios
      .get(cpurl('/superhero'))
      .then(res => {
        dispatch(receiveHeroes(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function fetchPartners() {
  return dispatch => {
    // API Call
    axios
      .get(cpurl('/partners'))
      .then(res => {
        dispatch(receivePartners(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function fetchPages() {
  return dispatch => {
    // API Call
    axios
      .get(cpurl('/pages'))
      .then(res => {
        dispatch(receivePages(res.data)); // Got em
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function fetchOnePage(id) {
  return dispatch => {
    dispatch(fetchingOnePage());

    // API Call
    setTimeout(() => {
      axios
        .get(cpurl(`/pages/${id}`))
        .then(res => {
          dispatch(receiveOnePage(res.data)); // Got em
        })
        .catch(err => {
          console.log('err', err);
        });
    }, 1900);
  };
}
