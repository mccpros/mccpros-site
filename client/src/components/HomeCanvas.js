// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as THREE from 'three';

// We should probably check prop types
// const propTypes = {
//
// };

class HomeCanvas extends Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   wrapper: document.getElementById('canvas-wrapper'),
    //   scene: new THREE.Scene(),
    //   camera: new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
    //   renderer: new THREE.WebGLRenderer(),
    // }, this.init);
  }

  init() {
    let { wrapper, renderer, scene, camera } = this.state;

    renderer.setSize( window.innerWidth, window.innerHeight );
    wrapper.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    this.setState({ cube: new THREE.Mesh( geometry, material ) }, () => {
      scene.add( this.state.cube );

      camera.position.z = 5;
      this.animate();
    });

  }

  animate() {
    this.state.cube.rotation.x += 0.1;
    this.state.cube.rotation.y += 0.1;

  	requestAnimationFrame( this.animate );
  	this.state.renderer.render( this.state.scene, this.state.camera );
  }

  render() {
    return (
      <div id='canvas-wrapper'>

      </div>
    );
  }
}

// HomeCanvas.propTypes = propTypes;

export default HomeCanvas;
