// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import HeroCard from './HeroCard';
// We should probably check prop types
// const propTypes = {
//
// };

class HeroRow extends Component {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  componentDidMount() {
    this.scrollEl = document.getElementById('hero-scroll');
  }

  handleHover(right) {
    this.setState({
      scroll: setInterval(() => {
        right ?
        this.scrollEl.scrollLeft += 1.5 :
        this.scrollEl.scrollLeft -= 1.5
      }, 1)
    })
  }

  endHover() {
    clearInterval(this.state.scroll);
  }

  render() {
    let { heroes } = this.props;
    let totalWidth = heroes ? `${400 * heroes.length}px` : '0px';

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-offset-md-2'>
              <h2 className='title arvo green'>Meet the IT Superheroes</h2>
            </div>
          </div>
        </div>

        <div className='controller-wrapper'>
          <div
            onMouseOver={() => this.handleHover(false)}
            onMouseOut={this.endHover}
            className='hero-control icon-left-open-mini'></div>
          <div
            onMouseOver={() => this.handleHover(true)}
            onMouseOut={this.endHover}
            className='hero-control icon-right-open-mini'></div>

          <div className='hero-row-container' id='hero-scroll'>
            <div
              style={{ width: totalWidth }}
              className='hero-row'>
              { heroes ?
                heroes.map((h, idx) => {
                  return (
                    <HeroCard
                      hero={h}
                      key={idx} />
                    )
                  }) :
                  'Loading...'
                }
              </div>
            </div>

        </div>
      </div>
    );
  }
}

// HeroRow.propTypes = propTypes;

export default HeroRow;
