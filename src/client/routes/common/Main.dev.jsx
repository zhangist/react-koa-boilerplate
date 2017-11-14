import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import DevTools from './DevTools';
import Main from './Main';

class MainDev extends Component {
  constructor() {
    super();
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.mounted();
    console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.');
  }

  mounted() {
    this.setState({ isMounted: true });
  }

  render() {
    const { isMounted } = this.state;
    const { route } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <Main route={route} />
        {isMounted && <DevTools />}
      </div>
    );
  }
}

MainDev.propTypes = {
  route: PropTypes.object.isRequired,
};

export default MainDev;
