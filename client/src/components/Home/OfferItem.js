// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// We should probably check prop types
// const propTypes = {
//
// };

class OfferItem extends Component {
  constructor(props) {
    super(props);

  }

  renderOfferDetails() {
    let { data } = this.props;

    data.details.map(d => {
      
    })
  }

  render() {
    let { data } = this.props;

    return (
     <div className='offer-item'>

        <h2>{ data.name }</h2>

        { this.renderOfferDetails() }

      </div>
    );
  }
}

// OfferItem.propTypes = propTypes;

export default OfferItem;
