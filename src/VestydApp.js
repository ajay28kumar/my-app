import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import cookie from 'cookie';
import {parse} from 'qs';
// import {onAppInit} from './actions';

// import LayerPartial from './partials/LayerPartial';

class VestydApp extends React.PureComponent {
  constructor(props) {
    super(props);
    
    const cookies = cookie.parse(document.cookie);
    const params = parse(props.location.search.slice(1));
    console.log('cookies :', cookies, " params :", params);
    // onAppInit(props.history, props.location, params, cookies)(props.dispatch, props.getState);
  }
  
  render() {
    return (
      <div>
        {/* <HeaderPartial /> */}
        <div className="main-content">
          {this.props.children}
          {/* <FooterPartial /> */}
        </div>
        {/*<LayerPartial />*/}
      </div>
    );
  }
}

VestydApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

export default withRouter(VestydApp);
