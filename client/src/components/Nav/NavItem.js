// import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
        onMouseLeave={ !this.isMobile ? this.props.mouseOutHandler : this.props.clickHandler }
        onMouseUp={ this.isMobile ? this.props.clickHandler : null }
        className='nav-item'>
        <a
          style={{ color: this.props.color === '#fcfcfc' ?
                     '' :
                     '#fcfcfc' }}
          className={`lato black ${this.props.className}`}
          href={ this.props.page.acf.url }>

          { this.props.page.title.rendered }

        </a>

        { this.props.children ? this.props.children : '' }

      </li>
    );
  }
}

// NavItem.propTypes = propTypes;

export default NavItem;
