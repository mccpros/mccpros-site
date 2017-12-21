// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import Plane from './Plane';

// We should probably check prop types
// const propTypes = {
//
// };

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      cameraPosX: 0,
      cameraPosY: 0,
      mouseX: 0,
      mouseY: 0,
    }

    this.setWindowSize = this.setWindowSize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this._onAnimate = this._onAnimate.bind(this);
  }

  componentDidMount() {
    this.setWindowSize();

    window.addEventListener('resize', this.setWindowSize);
    document.addEventListener( 'mousemove', this.onMouseMove, false );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
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
      mouseX: ( event.clientX - this.state.windowHalfX ) / 2000,
			mouseY: ( event.clientY - this.state.windowHalfY ) / 2000,
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

  render() {
    return (
      <React3
        mainCamera='camera'
        width={this.state.width}
        height={this.state.height}
        onAnimate={this._onAnimate} >

      <scene>
        <perspectiveCamera
          name='camera'
          fov={100}
          aspect={this.state.width / this.state.height}
          near={0.1}
          far={5000}
          position={ new THREE.Vector3(this.state.cameraPosX, this.state.cameraPosY, 3) } />

        <Plane
          pos={ { x: 0, y: 0, z: -2 } }
          width={ 32 }
          height={ 18 }
          lookAt={ { x: this.state.cameraPosX, y:this.state.cameraPosY } }
          src='/threejs/header.png' />

        <Plane
          pos={ { x: 4, y: -1, z: -0.3 } }
          width={ 6 }
          height={ 12 }
          src='/threejs/Nick.png' />

        <Plane
          pos={ { x: 1.3, y: -2.4, z: -1 } }
          width={ 5.8 }
          height={ 12 }
          src='/threejs/Maxine.png' />

        <Plane
          pos={ { x: 7, y: -2.2, z: -1 } }
          width={ 6 }
          height={ 12 }
          src='/threejs/Shane.png' />

      </scene>
    </React3>
    );
  }
}

// Canvas.propTypes = propTypes;

export default Canvas;
