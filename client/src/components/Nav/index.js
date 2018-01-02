// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import Swipeable from 'react-swipeable';

import NavItem from './NavItem';

// We should probably check prop types
// const propTypes = {
//
// };

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'rgb(244, 244, 244)',
      scrolledTop: true,
      menuIsOpen: false,
      subNavLib: {}
    }

    this.isMobile = (function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    })();

    this.subNavLib = {};

    this.renderNavBar     = this.renderNavBar.bind(this);
    this.returnNavItem    = this.returnNavItem.bind(this);
    this.getScroll        = this.getScroll.bind(this);
    this.cancelLink       = this.cancelLink.bind(this);
    this.showMobileSubNav = this.showMobileSubNav.bind(this);
    this.hideMobileSubNav = this.hideMobileSubNav.bind(this);
    this.menuStateChange  = this.menuStateChange.bind(this);
    this.hideMenu         = this.hideMenu.bind(this);
  }

  componentDidMount() {
    let { pathname } = this.props.location; // Checks Location

    if(pathname === '/') { // Event listener only on Homepage
      window.addEventListener('scroll', this.getScroll);
    }

    setTimeout(() => this.addSubNavClickHandlers(), 1000);
    setTimeout(() => this.addSubCancelClickHandlers(), 1000);

    this.getScroll();
  }

  componentWillUnmount() {
    for(let key in this.icons) {
      if(this.icons.hasOwnProperty(key)) {
        this.icons[key].removeEventListener('click', this.hideMobileSubNav);
      }
    }

    if(this.topLinks) {
      for(let key in this.topLinks) {
        if(this.topLinks.hasOwnProperty(key)) {
          this.topLinks[key].removeEventListener('click', this.cancelLink);
        }
      }
    }

    window.removeEventListener('scroll', this.getScroll); // Remove Event Listener
  }

  addSubNavClickHandlers() {
    if(this.isMobile) {
      this.topLinks = document.getElementsByClassName('main-li-a');

      for(let key in this.topLinks) {
        if(this.topLinks.hasOwnProperty(key)) {
          this.topLinks[key].addEventListener('click', this.cancelLink);
        }
      }
    }
  }

  addSubCancelClickHandlers() {
    if(this.isMobile) {
      this.icons = document.getElementsByClassName('icon-cancel');

      for(let key in this.icons) {
        if(this.icons.hasOwnProperty(key)) {
          this.icons[key].addEventListener('click', this.hideMobileSubNav);
        }
      }
    }
  }

  cancelLink(e) {
    let subNav = e.target.parentNode.querySelector('ul');

    if(subNav) {
      e.preventDefault();
      e.stopPropagation();

      this.showMobileSubNav(subNav);
    }
  }

  getScroll() {
    let { pathname } = this.props.location;

    if(document.querySelector('html').scrollTop === 0 &&
        pathname === '/') {
      // If Home and scrolled to top
      // Keep the bar transparent
      this.setState({ scrolledTop: true });

      if(!this.isMobile) {
        this.setState({ color: 'transparent' });
      }
    } else {
      // If Not Home or not scrolled to top
      // Make the bar white
      this.setState({
        color: 'rgb(244, 244, 244)',
        scrolledTop: false
      });
    }
  }

  showMobileSubNav(el) {
    // Track open menu
    this.setState({ openSubEl: el }, () => {
      this.state.openSubEl.style.transform = 'translateX(0px)';
      this.state.openSubEl.style.opacity = '1';
    })
  }

  hideMobileSubNav() {
    if(!this.state.openSubEl) return;

    this.state.openSubEl.style.transform = 'translateX(400px)';
    this.state.openSubEl.style.opacity = '1';
  }

  hideMenu() {
    this.hideMobileSubNav();
    this.setState({ menuIsOpen: false });
  }

  menuStateChange(menu) {
    this.setState({ menuIsOpen: menu.isOpen }, () => {
      if(!this.state.menuIsOpen) this.hideMobileSubNav();
    });
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
        mouseOverHandler={ this.showSubNav }
        mouseOutHandler={ this.hideSubNav }>
        { subNavs }
      </NavItem>
    );
  }

  renderMobileNav() {
    return (
      <div className='mobile-nav-wrapper'>
        <Link to='/'>
          <img src='/assets/mcc.png' alt='Merino Computer Concepts Logo'/>
        </Link>
        <div className='mobile-burger-wrapper'>
          <Swipeable
            onSwipedRight={ this.hideMenu }>
            <Menu
              onStateChange={ this.menuStateChange }
              isOpen={ this.state.menuIsOpen }
              pageWrapId={ 'pageWrapper' }
              outerContainerId={ 'root' }
              right>
              { this.renderNavBar(false) }
            </Menu>
          </Swipeable>
        </div>
      </div>
    );
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
        let mainNav   = main[i];  // Main Nav Data
        let subNavArr = this.subNavLib[subNavKeys[i]]; // Sub Pages for one Parent
        subNavArr.sort((a,b) => parseInt(a.acf.order) - parseInt(b.acf.order)); // Sort

        // Map through each subpage,
        // Push ONE <ul> for each Parent Page
        let subNav = subNavArr.length <= 0 ? null : (
          <ul data-index={i} key={i} className='sub-ul'>
            <i className='icon-cancel'></i>
            { this.isMobile && this.returnNavItem(mainNav) }
            { subNavArr.map((s, i) => this.returnNavItem(s, i, null, 'sub-li')) }
          </ul>
        );

        mainEls.push(this.returnNavItem(mainNav, i, subNav, 'main-li'));
      }
    }

    return (
      <div className='navbar-wrapper'
        style={{
          backgroundColor: this.state.color,
          boxShadow: this.state.scrolledTop || this.isMobile ?
            '0px 0px 12px -1px transparent' :
            '0px 0px 12px -1px rgba(0, 0, 0, .4)'
        }}>
        { logo &&
          <div className='nav-img-wrapper'>
            <Link to='/'>
              <img src='/assets/mcc.png' alt=""/>
            </Link>
          </div> }
          <div className='nav-main-wrapper'>
            <ul
              className='main-ul'>
              { mainEls }
            </ul>

          </div>
        </div>
    );
  }

  render() {
    let width = window.outerWidth;

    if(!this.props.pages || !this.props.pages.length) {
      return <div>Loading...</div>
    }

    let backgroundColor = this.isMobile || window.innerWidth < 1185 ?
                            '#07638F' : 'transparent';

    return (
      <div>
        { width >= 769 ?
          this.renderNavBar(true) :
          this.renderMobileNav() }

        {/*<p
          style={{
            color: window.innerWidth < 1185 || this.isMobile || this.state.scrolledTop ?
                      '#fff' :
                      'rgba(0,0,0,.87)',
            backgroundColor: !this.state.scrolledTop ?
                              backgroundColor :
                              'transparent',
            boxShadow: (window.innerWidth < 1185 || this.isMobile) && !this.state.scrolledTop ?
                        '0px 0px 12px -1px rgba(0, 0, 0, .4)' :
                        '0px 0px 12px -1px transparent'
          }}
            className='lato celebrating'>

            <span><img src='/assets/confetti_emoji.png' alt='20 year anniversary'/></span>
            Celebrating 20 years of business!
            <span><img src='/assets/confetti_emoji.png' alt='20 year anniversary'/></span>

        </p>*/}
      </div>

    );
  }
}

// Nav.propTypes = propTypes;

export default withRouter(props => <Nav {...props}/>);
