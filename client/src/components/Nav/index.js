// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu'

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

    this.renderNavBar     = this.renderNavBar.bind(this);
    this.returnNavItem    = this.returnNavItem.bind(this);
    this.getScroll        = this.getScroll.bind(this);
    this.showSubNav       = this.showSubNav.bind(this);
    this.hideSubNav       = this.hideSubNav.bind(this);
    this.showMobileSubNav = this.showMobileSubNav.bind(this);
  }

  componentDidMount() {
    let { pathname } = this.props.location; // Checks Location

    if(pathname === '/') { // Event listener only on Homepage
      window.addEventListener('scroll', this.getScroll);
    }
    if(window.innerWidth < 769) {
      this.topLinks = document.getElementsByClassName('main-li-a');

      for (var key in this.topLinks) {
        if (this.topLinks.hasOwnProperty(key)) {
          this.topLinks[key].addEventListener('click', this.cancelLink);
        }
      }

    }

    this.getScroll();
  }

  componentWillUnmount() {
    // document.getElementsByClassName('.main-li-a').forEach(el => {
    //   el.removeEventListener('click', this.cancelLink);
    // });
    window.removeEventListener('scroll', this.getScroll); // Remove Event Listener
  }

  cancelLink(e) {
    e.preventDefault();
    e.stopPropagation();
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

  renderNavBar(logo) {
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

        mainEls.push(this.returnNavItem(mainNav, i, subNav, 'main-li-a'));
      }
    }

    return (
      <div className='navbar-wrapper'
        style={{
          backgroundColor: this.state.color,
          borderBottom: this.state.color === '#fcfcfc' ?
                     '2px solid #00638D' :
                     '0px'
         }}>
           { logo ?
             <div className='nav-img-wrapper'>
               <img src='/assets/mcc.png' alt=""/>
             </div> :
             ''
           }
          <div className='nav-main-wrapper'>
            <ul
              style={{ backgroundColor: this.state.color }}
              className='main-ul'>
              { mainEls }
            </ul>
          </div>
        </div>
    );
  }

  // Creates <li> for all <ul> types
  returnNavItem(page, index, subNavs, className) {
    return (
      <NavItem
        {...this.state}
        key={index}
        index={index}
        page={page}
        className={ className ||  '' }
        clickHandler={this.showMobileSubNav}
        mouseOverHandler={this.showSubNav}
        mouseOutHandler={this.hideSubNav}>
        { subNavs }
      </NavItem>
    );
  }

  showMobileSubNav(e) {
    let allSubs = document.getElementsByClassName('sub-ul')
    for (var key in allSubs) {
      if (allSubs.hasOwnProperty(key)) {
        allSubs[key].style.display = 'none';
        allSubs[key].style.position = 'absolute';
      }
    }

    if(!e || !e.target) return;
    let el = e.target;
    let subEl = el.querySelector('ul');

    if(!subEl) subEl = el.parentNode;
    if(!this.matches(subEl, '.sub-ul')) subEl = subEl.querySelector('ul');
    if(!subEl || !this.matches(subEl, '.sub-ul')) return;

    subEl.style.display = 'inline';
    subEl.style.position = 'relative';
  }

  showSubNav(e) {
    let el = e.target;
    let subEl = el.querySelector('ul');

    if(!subEl) return;
    subEl.style.display = 'block';

    setTimeout(() => {
      subEl.style.opacity = '1';
    }, 0)
  }

  hideSubNav(e) {
    let el = e.target;
    let subEl = el.querySelector('ul');

    if(!subEl) subEl = el.parentNode;
    if(!this.matches(subEl, '.sub-ul')) subEl = subEl.parentNode;

    subEl.style.opacity = '0';

    setTimeout(() => {
      subEl.style.display = 'none';
    }, 200)
  }

  matches(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
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

  renderMobileNav() {
    return (
      <div className='mobile-nav-wrapper'>

        <div className='mobile-burger-wrapper'>
          <Menu
            pageWrapId={ 'pageWrapper' }
            outerContainerId={ 'root' }
            right>
            { this.renderNavBar(false) }
          </Menu>
        </div>
      </div>
    );
  }

  render() {
    let width = window.outerWidth;

    if(!this.props.pages || !this.props.pages.length) {
      return <div>Loading...</div>
    }

    return (
      <div>
        { width >= 769 ?
          this.renderNavBar(true) :
          this.renderMobileNav() }
      </div>

    );
  }
}

// Nav.propTypes = propTypes;

export default withRouter(props => <Nav {...props}/>);
