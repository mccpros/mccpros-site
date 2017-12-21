// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Canvas extends Component {
  render() {
    let { x, y, z } = this.props.pos;
    let pos = new THREE.Vector3(x, y, z);

    return (
        <mesh
          lookAt={ this.props.lookAt && this.props.lookAt.x &&
                    new THREE.Vector3(this.props.lookAt.x / 16, this.props.lookAt.y / 16, 3) }
          position={ pos }>

          <planeGeometry
            width={ this.props.width }
            height={ this.props.height } />

          <meshBasicMaterial
            transparent={true}
            opacity={1}>
            <texture url={ this.props.src }></texture>
          </meshBasicMaterial>
        </mesh>
    );
  }
}

// Canvas.propTypes = propTypes;

export default Canvas;