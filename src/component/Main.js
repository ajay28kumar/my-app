import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';


const muiTheme = getMuiTheme({
  fontFamily: 'Roboto',
  palette: {
    textColor: '#51505d',
    primary1Color: '#599a02',
    alternateTextColor: Colors.white,
  },
});


const Main = props =>
  <MuiThemeProvider muiTheme={muiTheme}>
    {props.children}
  </MuiThemeProvider>;

Main.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Main;
