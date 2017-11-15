// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CoverAnimation from '../CoverAnimation';
// We should probably check prop types
// const propTypes = {
//
// };

class WhyWereDifferent extends Component {
  constructor(props) {
    super(props);

    this.renderP = this.renderP.bind(this);
  }

  renderP () {
    let { acf } = this.props.home;

    return acf.why_were_different.split('|').map((s, i) => {
      if(i === 0) this.keyword = s;
      return (<p key={i}>{s}</p>);
    });
  }

  render() {
    return (
      <div className='container-fluid no-padding'>
        <div className='row relative'>

          <div className='col-xs-12'>
            <div className='why_were_different'>

              <div className='col-xs-12 col-md-6 no-padding'>

                <div className='why-heroes-img'></div>

              </div>

              <div className='col-xs-12 col-md-6 different-container'>

                <div className='different-text black left lato'>
                  <h2 className='arvo title'>
                    <span className="green">why</span> we're different
                    <CoverAnimation />
                  </h2>

                { this.renderP() }

                </div>


                <h4 className='stylized-header arvo'>
                  { this.keyword.substring(0, this.keyword.length - 1) || '' }
                  <CoverAnimation />
                </h4>
              </div>
            </div>
          </div>

          <div className="separator"></div>

        </div>
      </div>

    );
  }
}

// WhyWereDifferent.propTypes = propTypes;

export default WhyWereDifferent;
