// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import { TextureLoader, Vector3 } from 'three';

import Plane from './Plane';

// We should probably check prop types
// const propTypes = {
//
// };

class Canvas extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      cameraPosX: 0,
      cameraPosY: 0,
      mouseX: 0,
      mouseY: 0,
      loaded: false,
    }

    this.textures = {
      'back': {
        url: '/threejs/header.jpg',
      },
      'nick': {
        url: '/threejs/Nick.png',
      },
      'maxine': {
        url: '/threejs/Maxine.png',
      },
      'shane': {
        url: '/threejs/Shane.png',
      },
    };

    this.loader = new TextureLoader();

    this.setWindowSize = this.setWindowSize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this._onAnimate = this._onAnimate.bind(this);
  }

  componentDidMount() {
    if(!this.props.isMobile) {
      this.setWindowSize();
      this.preLoadCanvas();

      window.addEventListener('resize', this.setWindowSize);
      document.addEventListener( 'mousemove', this.onMouseMove, false );
    } else {
      this.preloadDeviceImages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  _onAnimate() {
    let { cameraPosX, cameraPosY, mouseX, mouseY } = this.state;
    let timer = 0.0001 * Date.now();

    this.setState({
      cameraPosX: cameraPosX + ( mouseX - cameraPosX ) * .05,
      cameraPosY: cameraPosY + ( - mouseY - cameraPosY ) * .05,
    })
  }

  onMouseMove(e) {
    this.setState({
      mouseX: ( e.clientX - this.state.windowHalfX ) / 2000,
			mouseY: ( e.clientY - this.state.windowHalfY ) / 2000,
    });
  }

  setWindowSize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
			windowHalfX: window.innerWidth / 2,
			windowHalfY: window.innerHeight / 2,
    });
  }

  preloadDeviceImages() {
    let src = window.innerWidth < 768 ?
                '/assets/mobile_header.png' :
                '/assets/tablet_header.png';

    let img = new Image();
    img.onload = () => {
      this.props.homeLoad(true);
    }

    img.src = src;
  }

  preLoadCanvas() {
    let texturePromises = [];

    for(let key in this.textures) {
      if(this.textures.hasOwnProperty(key)) {
        let url = this.textures[key].url;
        texturePromises.push(this.loaderPromise(url));
      }
    }

    Promise.all(texturePromises)
      .then(() => {
        this.setState({ loaded: true }, () => {
          setTimeout(() => {
            this.props.homeLoad(true);
          }, 500);
        });
      })
  }

  loaderPromise(url) {
    return new Promise((resolve, reject) => {

      this.loader.load(url, () => {
        resolve();
      });
    });
  }

  renderPlanes() {
    let scaleWidth1 = this.state.width > 768 ? 250 : 175;
    let scaleWidth2 = this.state.width > 768 ? 260 : 185;

    let scaleHeight1 = this.state.width > 768 ? 130 : 87.5;
    let scaleHeight2 = this.state.width > 768 ? 125 : 92.5;

    let nickSpacing = 0.0024;
    let maxineSpacing = this.state.width > 768 ? 0.0004 : -0.0018;
    let shaneSpacing = this.state.width > 768 ? 0.0045 : 0.0058;

    let nickHeight = this.state.width > 550 ? -0.0004 : 0.0022;
    let maxineHeight = this.state.width > 550 ? -0.0009 : 0.002;
    let shaneHeight = this.state.width > 550 ? -0.0009 : 0.002;

    return (
      <group>
        <Plane
          {...this.state}
          pos={ { x: 0, y: 0, z: -2 } }
          width={ 32 }
          height={ 18 }
          src='/threejs/header.jpg' />

        <Plane
          {...this.state}
          pos={ {
            x: this.state.width > 1500 ?  4 : this.state.width * nickSpacing,
            y: this.state.width > 1500 ? -1 : this.state.width * nickHeight,
            z: -0.3
          } }
          width={ this.state.width > 1500 ? 6 : this.state.width / scaleWidth1 }
          height={ this.state.width > 1500 ? 12 : this.state.width / scaleHeight1 }
          src='/threejs/Nick.png' />

        <Plane
          {...this.state}
          pos={ {
            x: this.state.width > 1500 ?  1.3 : this.state.width * maxineSpacing,
            y: this.state.width > 1500 ? -2.4 : this.state.width * maxineHeight,
            z: -1
          } }
          width={ this.state.width > 1500 ? 5.8 : this.state.width / scaleWidth2 }
          height={ this.state.width > 1500 ? 12 : this.state.width / scaleHeight2 }
          src='/threejs/Maxine.png' />

        <Plane
          {...this.state}
          pos={ {
            x: this.state.width > 1500 ?  7 : this.state.width * shaneSpacing,
            y: this.state.width > 1500 ? -2.2 : this.state.width * shaneHeight,
            z: -1
          } }
          width={ this.state.width > 1500 ? 6 : this.state.width / scaleWidth1 }
          height={ this.state.width > 1500 ? 12 : this.state.width / scaleHeight2 }
          src='/threejs/Shane.png' />
      </group>
    )
  }

  callback(renderer) {
    if(renderer && renderer.context) {
      renderer.context.getShaderInfoLog = function () { return '' };
    }
  }

  render() {

    if(this.props.isMobile) {
      return (
        <img
          className='device-header-img'
          src={ window.innerWidth < 768 ?
                    '/assets/mobile_header.png' :
                    '/assets/tablet_header.png' } alt='Merino Computer Concepts Superheroes'/>
      )
    }

    let heightOffset = this.state.width < 768 ? 0.8 : 0.8;
    let canvasHeight = this.state.width < 1200 ? this.state.height * heightOffset : this.state.height;

    return (
      <React3
        alpha={ true }
        ref={ ref => this.renderer = ref }
        mainCamera='camera'
        width={ this.state.width }
        height={ canvasHeight }
        onRendererUpdated={this.callback}
        onAnimate={ this._onAnimate } >

      <scene
        ref={ ref => this.scene = ref }>
        <perspectiveCamera
          name='camera'
          ref={ ref => this.camera = ref }
          fov={100}
          aspect={ this.state.width / (canvasHeight)}
          near={0.1}
          far={5000}
          position={ new Vector3(this.state.cameraPosX, this.state.cameraPosY, 3) } />

        { this.state.loaded && this.renderPlanes() }

      </scene>
    </React3>
    );
  }
}

// Canvas.propTypes = propTypes;

export default Canvas;
