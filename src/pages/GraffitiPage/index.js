/* eslint react/require-default-props: 0 */

import React from 'react';
import {connect} from 'react-redux';
import cookie from "cookie";
import {doGraffitiAction} from "../../actions";
import {parse} from "qs";
import ChartContainer from "../../component/graffitiCharts/ChartContainer";

//import PropTypes from 'prop-types';

class GraffitiPage extends React.PureComponent {
  constructor(props) {
    super(props);
    
    const cookies = cookie.parse(document.cookie);
    const params = parse(props.location.search.slice(1));
    console.log('cookies :', cookies, " params :", params);
    this.props.doGraffitiAction(props.history, props.location, params, cookies)
  }
  
  render() {
    return <div>
      <h1>Graffiti</h1>
      <ChartContainer graffiti={this.props.graffiti} chartAction={this.props.doGraffitiAction}/>
      <pre>{JSON.stringify(this.props.graffiti, null, 3)}</pre>
    </div>
  }
};

const mapStateToProps = (state) => {
  const {graffiti} = state;
  return {
    graffiti
  }
};


export default connect(mapStateToProps, {doGraffitiAction})(GraffitiPage);