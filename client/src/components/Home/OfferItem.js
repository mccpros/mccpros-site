/* Home page
    What We Offer Item */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OfferItem extends Component {
  
  renderOfferDetails() {
    let { data } = this.props;

    return data.details.map((d, i) => {
      return <li className='lato' key={ i }>{ d }</li>;
    });
  }

  render() {
    let { data } = this.props;

    return (
     <div
       className='offer-item col-xs-12 col-md-6'
       style={ {
         opacity: this.props.oppPosition === this.props.positionName ? // Track based on the opposite, I know that's weird but it works...
                  .4 :
                  1
       } }>

        <h2 className='arvo title'>{ data.name }</h2>

        <p className='lato'>{ data.desc }</p>

        <h3 className='arvo green title'>includes</h3>

        <ul className="offer-includes no-padding">
          { this.renderOfferDetails() }
        </ul>

        <Link to={`/${this.props.data.name}`}>
          <button className='btn arvo white static-button relative'>
            Learn More
          </button>
        </Link>

      </div>
    );
  }
}

export default OfferItem;
