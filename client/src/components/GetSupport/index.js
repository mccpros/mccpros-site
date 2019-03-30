/* Get Support Page */
import React, { Component } from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';
import { animateScroll as Scroll } from 'react-scroll';

import NavContainer from '../../containers/NavContainer';
import FooterContainer from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Content from '../Page/Content';
import Loader from '../Loader';
import MapComponent from './Map';

// We should probably check prop types
// const propTypes = {
//
// };

class GetSupport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      messageSent: false,
      sending: false,
      loading: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleCallback = this.googleCallback.bind(this);
    this.setGresposne = this.setGresposne.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);
    Scroll.scrollToTop();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.page && newProps.page.content_id) {
      this.props.loadComplete();
      this.setState({ loading: false });
    }
  }

  handleChange(e) {
    // Track input values in state
    let name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      messageSent: true,
      sending: true,
    });

    // Captcha, if haven't catpcha'd already
    if (!this.state.gresponse) {
      this.recaptcha.execute();
    } else {
      this.googleCallback();
    }
  }

  setGresposne() {
    if (!this.state.gresponse) {
      this.setState({ gresponse: this.recaptcha.getResponse() }, this.googleCallback);
    }
  }

  googleCallback() {
    let data = {
      gresponse: this.state.gresponse,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
      company: this.state.company,
    };

    let valid = this.validateForm(data);

    if (valid) {
      // Send to api
      this.props.postMessage(data);
    } else {
      this.setState({ sending: false });
    }
  }

  validateForm(data) {
    let valid = true;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (key !== 'phone' && !data[key] && data[key].length <= 0) {
          valid = false;
          this.setState({ [key]: '' });
        }
      }
    }
    return valid;
  }

  renderForm() {
    return (
      <Content loadComplete={this.loadComplete} {...this.props}>
        <div className="col-xs-12 col-md-6">
          <form onSubmit={this.handleSubmit} className="contact-form">
            <label className="lato black" htmlFor="name">
              Name*
            </label>
            <input
              name="name"
              className={`lato ${this.state.messageSent && !this.state.name ? 'incorrect' : ''}`}
              type="text"
              value={this.state.name}
              ref={name => (this.name = name)}
              onChange={this.handleChange}
            />
            <label className="lato black" htmlFor="email">
              Email*
            </label>
            <input
              name="email"
              className={`lato ${this.state.messageSent && !this.state.email ? 'incorrect' : ''}`}
              type="email"
              value={this.state.email}
              ref={email => (this.email = email)}
              onChange={this.handleChange}
            />
            <label className="lato black" htmlFor="company">
              Company*
            </label>
            <input
              name="company"
              className={`lato ${this.state.messageSent && !this.state.company ? 'incorrect' : ''}`}
              type="text"
              value={this.state.company}
              ref={company => (this.company = company)}
              onChange={this.handleChange}
            />
            <label className="lato black" htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              className={`lato`}
              type="text"
              value={this.state.phone}
              ref={phone => (this.phone = phone)}
              onChange={this.handleChange}
            />
            <label className="lato black" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              className={`lato ${this.state.messageSent && !this.state.message ? 'incorrect' : ''}`}
              value={this.state.message}
              ref={message => (this.message = message)}
              onChange={this.handleChange}
            />
            <input
              disabled={this.props.message.received || this.state.sending}
              id="submit"
              className="lato white btn"
              type="submit"
              value={this.props.message.received ? 'Sent!' : 'Submit'}
            />
            <Recaptcha
              ref={ref => (this.recaptcha = ref)}
              sitekey="6Ld3mj4UAAAAAFJYts5G12CIwnfK0yBgyBuKIxBp"
              onResolved={this.setGresposne}
            />
          </form>
        </div>

        <div className="col-xs-12 col-md-6">
          <ul className="contact lato black">
            <li>
              <i className="icon-mail-alt" />
              <p>
                <a href="mailto:connect@mccpros.com">connect@mccpros.com</a>
              </p>
            </li>
            <li>
              <i className="icon-mobile" />
              <p>
                <a href="tel:18773656800">1-877-365-6800</a>
              </p>
            </li>
            <li>
              <i className="icon-map-pin" />
              <p>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/Merino+Computer+Concepts/@38.1156112,-121.2946386,16.51z/data=!4m5!3m4!1s0x0:0xd59a4d48f66cafcf!8m2!3d38.1151848!4d-121.2953057"
                >
                  1822 West Kettleman Lane Suite 4 <br />
                  Lodi, CA 95242
                </a>
              </p>
            </li>
          </ul>
        </div>

        <MapComponent
          mapElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} className="col-xs-12 map" />}
        />
      </Content>
    );
  }

  render() {
    return (
      <div className="support-container">
        <NavContainer {...this.props} />

        <div id="pageWrapper">
          <div className="page-parent" style={{ minHeight: this.state.loading ? '100vh' : '0vh' }}>
            {this.props.page && this.props.page.content_id ? (
              this.renderForm()
            ) : (
              <TransitionWrapper>
                <Loader />
              </TransitionWrapper>
            )}
          </div>

          <FooterContainer {...this.props} />
        </div>
      </div>
    );
  }
}

// GetSupport.propTypes = propTypes;

export default GetSupport;
