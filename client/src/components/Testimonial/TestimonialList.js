// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { animateScroll } from 'react-scroll'

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Content from '../Page/Content';
import Loader from '../Loader';
import Testimonial from './Testimonial';
// We should probably check prop types
// const propTypes = {
//
// };

class TestimonialList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      awaitLoad: 3,
      pageLoaded: false
    }

    this.loaded = 0

    // this.loadComplete = this.loadComplete.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);

    if(!this.props.testimonials || this.props.testimonials.length <= 0) {
      this.props.fetchTestimonials();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.testimonials) {
      this.props.loadComplete();
    }
  }

  renderTestimonials() {
    let { testimonials } = this.props;

    return (
      <Content {...this.props}>
        <div className='testimonial-list'>
          { testimonials.map((t, idx) => {
            return <Testimonial key={ idx } data={ t } />;
          })}
        </div>
      </Content>
    );
  }

  render() {
    return (
      <div>

        <NavContainer
          loadComplete={ this.loadComplete }
          {...this.props} />

        <div id="pageWrapper">
          <div className='page-container'>

          { this.props.testimonials && this.props.testimonials.length &&
              this.props.page ?
            this.renderTestimonials() :
            <TransitionWrapper><Loader /></TransitionWrapper> }

          <FooterContainer
            loadComplete={ this.loadComplete }
            {...this.props} />

          </div>
        </div>
      </div>
    );
  }
}

export default TestimonialList;
