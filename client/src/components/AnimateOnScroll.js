import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

function AnimateOnScroll(WrappedComponent) {

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        active: true,
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(isVisible) {
      if(!isVisible) return;

      this.setState({
        active: false
      });
    }

    render() {
      return (
        <VisibilitySensor
          partialVisibility={true}
          minTopValue={1}
          active={ this.state.active }
          onChange={ this.onChange }>
          {({isVisible}) =>
            <WrappedComponent
              animated={ isVisible }
              {...this.props}
              {...this.state}/>
          }
        </VisibilitySensor>
      );
    }
  };
}

export default AnimateOnScroll;
