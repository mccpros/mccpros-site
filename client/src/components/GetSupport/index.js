// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import NavContainer     from '../../containers/NavContainer';
import FooterContainer  from '../../containers/FooterContainer';

import TransitionWrapper from '../Transitions/TransitionWrapper';
import Content from '../Page/Content';
import Loader from '../Loader';
import MapComponent from './Map';

// We should probably check prop types
// const propTypes = {
//
// };

class GetSupport extends Component {
  constructor(props) {
    super(props);

     this.state = {
       name: '',
       email: '',
       phone: '',
       message: '',
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Start with an action
    this.props.fetchOnePage(this.props.pageId);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.page && newProps.page.id) {
      this.props.loadComplete();
    }
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  renderForm() {
    return (
      <Content
        loadComplete={ this.loadComplete }
        {...this.props}>

        <div className='col-xs-12 col-md-6'>
          <form
            onSubmit={this.handleSubmit}
            className='contact-form'>
            <label className='lato black' htmlFor='name'>Name*</label>
            <input
              name='name'
              className='lato'
              type='text'
              value={this.state.name}
              onChange={this.handleChange}/>
            <label className='lato black' htmlFor='email'>Email*</label>
            <input
              name='email'
              className='lato'
              type='email'
              value={this.state.email}
              onChange={this.handleChange}/>
            <label className='lato black' htmlFor='phone'>Phone</label>
            <input
              name='phone'
              className='lato'
              type='text'
              value={this.state.phone}
              onChange={this.handleChange}/>
            <label className='lato black' htmlFor='message'>Message</label>
            <textarea
              name='message'
              className='lato'
              value={this.state.message}
              onChange={this.handleChange}></textarea>
            <input
              id='submit'
              className='lato white btn'
              type='submit'
              value='Submit' />
          </form>
        </div>

        <div className='col-xs-12 col-md-6'>
          <ul className='contact lato black'>
            <li>
              <i className='icon-mail-alt'></i>
              <p><a href=''>connect@mccpros.com</a></p>
            </li>
            <li>
              <i className='icon-mobile'></i>
              <p><a href=''>1-877-365-6800</a></p>
            </li>
            <li>
              <i className='icon-map-pin'></i>
              <p><a href=''>1822 West Kettleman Lane Suite 4 <br/>
                            Lodi, CA 95242</a></p>
            </li>
          </ul>
        </div>


        <MapComponent
          mapElement={ <div style={{ height: '100%' }} /> }
          containerElement={ <div style={{ height: '400px' }}
                                  className='col-xs-12 map' /> } />

      </Content>
    )
  }

  render() {
    return (
      <div className='support-container'>

        <NavContainer
          {...this.props} />

        <div id="pageWrapper">

          <div className="page-parent">
            { this.props.page && this.props.page.id ?
              this.renderForm() :
                <TransitionWrapper><Loader /></TransitionWrapper> }
          </div>

          <FooterContainer
            {...this.props} />

        </div>

      </div>
    );
  }
}

// GetSupport.propTypes = propTypes;

export default GetSupport;
