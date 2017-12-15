import React from 'react';
import { connect } from 'react-redux';

// Most actions should happen right here
// Let all the data fall to Child through props
import { fetchTestimonials, fetchOnePage } from '../actions/WPInfoActions';

import TestimonialTranstion from '../components/Transitions/PageTransition';
import TestimonialList from '../components/Testimonial/TestimonialList';

// Don't render much in containers
// But pass the props!
const TestimonialContainer = props => <TestimonialList {...props} />;

// Where store/state becomes our props
const mapStateToProps = (state) => {
  const { testimonials, page } = state.wpInfo;

  return { // Pass it along
    testimonials,
    page
  };
};

export default TestimonialTranstion(
  connect(mapStateToProps, {
  fetchTestimonials,
  fetchOnePage,
})(TestimonialContainer));
