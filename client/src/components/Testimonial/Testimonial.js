/* Testimonial Page
    Testimonial */
import React, { Component } from 'react';
import { decode } from 'he';

class Testimonial extends Component {

  render() {
    let { data } = this.props;

    return (
      <div className='testimonial'>
        <div className='col-xs-12 col-sm-5 center'>
          <img src={ data.acf.company_logo } alt='Merino Computer Concepts Client'/>
        </div>

        <div className='col-xs-12 col-sm-7'>
          <h2 className='arvo black'>{ data.acf.company_name }</h2>
          <p className='lato black'>
            <span className='testimonial-quote top'>{ decode('&#8220;') }</span>
            { data.acf.quote }
            <span className='testimonial-quote bottom'>{ decode('&#8222;') }</span>
          </p>
          <p className='lato black'>{ data.acf.employee_name }</p>
        </div>

      </div>
    );
  }
}

export default Testimonial;
