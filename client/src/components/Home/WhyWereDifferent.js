/* Home page
    What We're Different section */
import React, { Component } from 'react';

import Parallax from './Parallax';
import CoverAnimation from '../CoverAnimation';

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

              <div className='col-md-6 no-padding parallax-different'>

                <div className='why-heroes-img'>
                  <div className="row">
                    <div className='col-xs-4 relative -why-hero-1-container'>
                      <Parallax
                        imgClass='-why-hero-1'
                        speed={ 0.06 }
                        offset={ 250 }
                        parentContainer='.why-heroes-img'
                        imgSrc='/assets/Denis.png' />
                    </div>
                    <div className='col-xs-4 relative -why-hero-2-container'>
                      <Parallax
                        imgClass='-why-hero-2'
                        speed={ 0.08 }
                        offset={ 220 }
                        parentContainer='.why-heroes-img'
                        imgSrc='/assets/Orlando.png' />
                    </div>
                    <div className='col-xs-4 relative -why-hero-3-container'>
                      <Parallax
                        imgClass='-why-hero-3'
                        speed={ 0.06 }
                        offset={ 240 }
                        parentContainer='.why-heroes-img'
                        imgSrc='/assets/Chris.png' />
                    </div>
                  </div>
                </div>

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

export default WhyWereDifferent;
