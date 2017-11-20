// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavItem from './NavItem';

// We should probably check prop types
// const propTypes = {
//
// };

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'transparent',
      subNavLib: {}
    }
    this.subNavLib = {};

    this.renderNavBar  = this.renderNavBar.bind(this);
    this.returnNavItem = this.returnNavItem.bind(this);
    this.getScroll     = this.getScroll.bind(this);
    this.showSubNav    = this.showSubNav.bind(this);
    this.hideSubNav    = this.hideSubNav.bind(this);
  }

  componentDidMount() {
    let { pathname } = this.props.location; // Checks Location

    if(pathname === '/') { // Event listener only on Homepage
      window.addEventListener('scroll', this.getScroll);
    }

    this.getScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getScroll); // Remove Event Listener
  }

  getScroll() {
    let { pathname } = this.props.location;

    if(document.querySelector('html').scrollTop === 0 &&
        pathname === '/') {
      // If Home and scrolled to top
      // Keep the bar transparent
      this.setState({ color: 'transparent' });
    } else {
      // If Not Home or not scrolled to top
      // Keep the bar transparent
      this.setState({ color: '#fcfcfc' });
      window.removeEventListener('scroll', this.getScroll);
    }
  }

  renderNavBar() {
    let mainEls = [];
    let subEls  = [];
    let main    = this.props.pages.filter(p => !p.acf.parent_page); // Parent Pages

    main.sort((a, b) => parseInt(a.acf.order) - parseInt(b.acf.order)); // Put them in order

    // Time to sort out sub pages
    main.forEach((m, idx) => {
      let subNavs = this.props.pages.filter(n => {
        return n.acf.parent_page === m.title.rendered; // Find Sub Pages
      });

      let newSubNavLib = {...this.subNavLib};    // Get to library
      newSubNavLib[m.title.rendered] = subNavs;  // Add to library

      this.subNavLib = newSubNavLib;
    });

    // Loop through Sub Pages
    let subNavKeys = Object.keys(this.subNavLib);
    for(let i = 0; i < subNavKeys.length; i++) {
      if (this.subNavLib.hasOwnProperty(subNavKeys[i])) {
        let subNavArr = this.subNavLib[subNavKeys[i]]; // Sub Pages for one Parent
        let mainNav   = main[i];  // Main Nav Data

        // Map through each subpage,
        // Push ONE <ul> for each Parent Page
        let subNav = (
          <ul data-index={i} key={i} className='sub-ul'>
            { subNavArr.map((s, i) => this.returnNavItem(s, i, null)) }
          </ul>
        );

        mainEls.push(this.returnNavItem(mainNav, i, subNav));
      }
    }

    return (
      <div className='nav-main-wrapper'>
        <ul
          style={{ backgroundColor: this.state.color }}
          className='main-ul'>
          { mainEls }
        </ul>
      </div>
    );
  }

  // Creates <li> for all <ul> types
  returnNavItem(page, index, subNavs) {
    return (
      <NavItem
        {...this.state}
        key={index}
        index={index}
        page={page}
        subNavs={subNavs && subNavs.length ? true : false}
        mouseOverHandler={this.showSubNav}
        mouseOutHandler={this.hideSubNav}>
        { subNavs }
      </NavItem>
    );
  }

  showSubNav(e) {
    this.setState({ color: '#fcfcfc' }) // Close the curtain;

    let element = e.target;                        // Element: <a>
    let subEl   = this.getSubElement(element);     // Element: <ul> (Sub Page Ul)
    if(!subEl || !subEl.style) return;

    let elRect  = element.getBoundingClientRect(); // For Later...

    subEl.style.display = 'block';  // Make it so it has height
    let subElHeight = subEl.clientHeight || subEl.offsetHeight; // Get Height

    subEl.style.transform = `translateY(-${subElHeight}px)`; // Pull behind curtain
    subEl.style.left = `${elRect.x + 10}px`;                 // Line it up with <li>

    setTimeout(() => {
      // Reveal
      subEl.style.opacity = 1;
      subEl.style.transform = `translateY(0px)`;
    }, 0)
  }

  hideSubNav(e) {
    let element = e.target;                  // Element: <a>
    let subEl = this.getSubElement(element); // Element: <ul> (Sub Page Ul)
    if(!subEl || !subEl.style) return;

    let subElHeight = subEl.clientHeight || subEl.offsetHeight; // Height

    subEl.style.transform = `translateY(-${subElHeight}px)`;   // Pull behind curtain
    subEl.style.opacity = 0;                                   // Hide it

    setTimeout(() => {
      subEl.style.display = 'none'; // Gone, girl
    }, 0)
  }

  getSubElement(el) {
    let subEl;
    let element = el.parentNode;          // <li>
    let elIndex = element.dataset.index;  // index to line up Sub <ul> with <li>

    let subUls = document.getElementsByClassName('sub-ul'); // Query subs
    for (let i = 0; i < subUls.length; i++) {
      // Return the one that matches
      if(subUls[i].dataset.index === elIndex) subEl = subUls[i];
    }

    return subEl;
  }

  render() {
    return (
     <div className='navbar-wrapper'
       style={{
         backgroundColor: this.state.color,
         borderBottom: this.state.color === '#fcfcfc' ?
                    '2px solid #00638D' :
                    '0px'
        }}>
        <div className='nav-img-wrapper'>
          <img src='/assets/mcc.png' alt=""/>
        </div>

        { this.props.pages && this.props.pages.length ?
          this.renderNavBar() :
          'Loading...'}

      </div>
    );
  }
}

// Nav.propTypes = propTypes;

export default withRouter(props => <Nav {...props}/>);
