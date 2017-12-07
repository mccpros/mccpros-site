import React, { Component } from 'react';
import TransitionGroup  from 'react-addons-transition-group';

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

class TransitionWrapper extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={ this.props.className }>
        <TransitionGroup
          component={firstChild}>
          { this.props.children }
        </TransitionGroup>
      </div>
    );
  }
}

export default TransitionWrapper;
