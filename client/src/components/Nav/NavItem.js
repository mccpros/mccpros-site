// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// We should probably check prop types
// const propTypes = {
//
// };

class NavItem extends Component {
  constructor(props) {
    super(props);

    this.isMobile = window.innerWidth <= 768;
  }

  render() {
    return (
      <li
        key={this.props.index}
        data-index={this.props.index}
        onMouseUp={ this.isMobile ? this.props.clickHandler : null }
        className={`nav-item ${this.props.className}`}>
        <Link
          style={{ color: this.props.color === 'rgb(244, 244, 244)' ?
                     '' :
                     '#fcfcfc' }}
          className={`lato black ${this.props.className}-a`}
          to={ this.props.page.acf.url }>

          { this.props.page.title.rendered }

        </Link>

        { this.props.children ? this.props.children : '' }

      </li>
    );
  }
}

// NavItem.propTypes = propTypes;

export default NavItem;
