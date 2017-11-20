// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class NavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <li
        key={this.props.index}
        data-index={this.props.index}
        className='nav-item'>
        <a
          style={{ color: this.props.color === '#fcfcfc' ?
                     '' :
                     '#fcfcfc' }}
          className='lato black'
          href={ this.props.page.acf.url }
          onMouseEnter={ this.props.subNavs ? this.props.mouseOverHandler : null }
          onMouseLeave={ this.props.subNavs ? this.props.mouseOutHandler  : null }>

          { this.props.page.title.rendered }

        </a>

        { this.props.children ? this.props.children : '' }

      </li>
    );
  }
}

// NavItem.propTypes = propTypes;

export default NavItem;
