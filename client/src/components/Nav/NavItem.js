// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// We should probably check prop types
// const propTypes = {
//
// };

class NavItem extends Component {
  render() {
    return (
      <li
        key={this.props.index}
        data-index={this.props.index}
        className={`nav-item ${this.props.className}`}
      >
        <Link
          style={{ color: this.props.color === 'rgb(244, 244, 244)' ? '' : '#fcfcfc' }}
          className={`lato black ${this.props.className}-a`}
          to={this.props.page.url}
        >
          {this.props.page.title}
        </Link>

        {this.props.children ? this.props.children : ''}
      </li>
    );
  }
}

// NavItem.propTypes = propTypes;

export default NavItem;
