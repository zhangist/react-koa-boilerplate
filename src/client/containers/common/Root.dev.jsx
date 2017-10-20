import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import DevTools from './DevTools';
import Root from './Root';

class RootDev extends Component {
  constructor() {
    super();
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.');
  }

  render() {
    const { isMounted } = this.state;
    const { route } = this.props;

    return (
      <div>
        <Root route={route} />
        {isMounted && <DevTools />}
      </div>
    );
  }
}

RootDev.propTypes = {
  route: PropTypes.object.isRequired,
};

export default RootDev;
