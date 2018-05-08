/* eslint react/require-default-props: 0 */
import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';

const HomePage = props => {
  return (
    <Redirect to={'/graffiti'}/>
  )
};

export default withRouter(HomePage);