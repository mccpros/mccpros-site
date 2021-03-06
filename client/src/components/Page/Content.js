/* Page
  Content Component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import JsxParser from 'react-jsx-parser';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionType: 'relative',
      left: 0,
      top: 0,
      fixed: false,
      show: false
    };

    this.checkFixed = this.checkFixed.bind(this);
    this.setData = this.setData.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.checkFixed);

    this.initData();
    setTimeout(() => this.setState({ show: true }), 400);

    document.title = `${this.props.page.title} - Merino Computer Concepts`;
    this.renderLinks();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.checkFixed);
  }

  // Sets column height
  initData() {
    let fixedCols = document.getElementsByClassName('fixed-col');
    let pageContent = document.getElementById('page-length');

    if (!pageContent || !fixedCols) return;
    this.fullHeight = pageContent.clientHeight || pageContent.offsetHeight;

    for (let i = 0; i < fixedCols.length; i++) {
      let col = fixedCols[i];
      col.style.height = `${this.fullHeight}px`;
    }

    this.setData();
  }

  renderLinks() {
    let links,
      html = this.props.page.content;

    let match = html.match(/(?:<a href="\/)/gi);

    if (match && match.length > 0) {
      links = html.replace(/(?:<a href="\/)/gi, '<Link to="/').replace(/(<\/a>)/g, '</Link>');
    }

    if (links) {
      this.props.page.content = links;
    }
  }

  // Sets top of scroll
  setData() {
    this.margin = 30;

    let navbar = document.getElementsByClassName('navbar-wrapper')[0];
    if (!navbar) return;

    this.navHeight = navbar.clientHeight || navbar.offsetHeight;
    this.navHeight += this.margin;

    let fixedEls = document.getElementsByClassName('fixed-social')[0];
    this.fixedData = fixedEls.getBoundingClientRect();
  }

  checkFixed(e) {
    // Sets <div> from relative to fixed
    let fixedCol = document.getElementsByClassName('fixed-col')[0];
    let colData = fixedCol.getBoundingClientRect();

    let distanceToTop = colData.y - this.navHeight;

    let position = colData.y - this.navHeight;
    let offset = colData.height - this.fixedData.height - this.margin;
    let distanceToBottom = position + offset;

    if (distanceToTop <= 0 && distanceToBottom > 0) {
      return this.setState({
        positionType: 'fixed',
        left: colData.x + 15,
        top: this.navHeight - 10,
        fixed: true
      });
    } else if (distanceToBottom <= 0 && this.state.fixed) {
      return this.setState({
        positionType: 'relative',
        left: 0,
        top: Math.abs(colData.y - this.fixedData.height / 2 - this.margin),
        fixed: false
      });
    } else if (this.state.fixed) {
      return this.setState({
        positionType: 'relative',
        left: 0,
        top: 0,
        fixed: false
      });
    }
  }

  render() {
    let { page } = this.props;

    return (
      <div className="container page-wrapper" style={{ opacity: this.state.show ? 1 : 0 }}>
        <div className="row">
          <div className="col-md-2 fixed-col fixed-social-wrapper">
            <div
              className="fixed-social"
              style={{
                position: this.state.positionType,
                top: this.state.top,
                left: this.state.left
              }}
            >
              <a
                target="_blank"
                href="https://www.facebook.com/mccpros/"
                className="fixed-social-link"
              >
                <i className="icon-facebook" />
              </a>
              <br />
              <a target="_blank" href="https://twitter.com/mccpros" className="fixed-social-link">
                <i className="icon-twitter" />
              </a>
              <br />
              <a
                target="_blank"
                href="https://www.linkedin.com/company/merino-computer-concepts/"
                className="fixed-social-link"
              >
                <i className="icon-linkedin" />
              </a>
            </div>
          </div>

          <div className="col-xs-12 col-md-8" id="page-length">
            <h1 className="arvo green page-title">{page.title}</h1>

            {page.hero_image && <img className="page-img" src={page.hero_image} />}

            <div className="page-content lato">
              <JsxParser bindings={{}} components={{ Link }} jsx={page.content} />
            </div>

            {this.props.children}
          </div>

          <div className="col-md-2 fixed-col fixed-contact-wrapper">
            <div
              style={{ position: this.state.positionType, top: this.state.top }}
              className="fixed-contact"
            >
              <h3 className="arvo white">Need Help?</h3>
              <p className="lato white">
                Don't see what you're looking for? Call us today to get the support you need!
              </p>
              <Link to="/support">
                <button className="lato white">Get Support</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
