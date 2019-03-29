/* Tesimonial Page */
import React, { Component } from 'react';
import { animateScroll as Scroll } from 'react-scroll';

import NavContainer from '../../containers/NavContainer';
import FooterContainer from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Content from '../Page/Content';
import Loader from '../Loader';
import Testimonial from './Testimonial';

class TestimonialList extends Component {
  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);

    if (!this.props.testimonials || this.props.testimonials.length <= 0) {
      this.props.fetchTestimonials();
    }

    Scroll.scrollToTop();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.testimonials && newProps.testimonials.length > 0) {
      this.props.loadComplete();
    }
  }

  renderTestimonials() {
    let { testimonials } = this.props;

    return (
      <Content {...this.props}>
        <div className="testimonial-list">
          {testimonials.map((t, idx) => {
            return <Testimonial key={idx} data={t} />;
          })}
        </div>
      </Content>
    );
  }

  render() {
    return (
      <div>
        <NavContainer loadComplete={this.loadComplete} {...this.props} />

        <div id="pageWrapper">
          <div className="page-container">
            <div className="page-parent" style={{ minHeight: '100vh' }}>
              {this.props.testimonials &&
              this.props.testimonials.length > 0 &&
              this.props.page &&
              this.props.page.content_id ? (
                this.renderTestimonials()
              ) : (
                <TransitionWrapper>
                  <Loader />
                </TransitionWrapper>
              )}
            </div>

            <FooterContainer loadComplete={this.loadComplete} {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default TestimonialList;
