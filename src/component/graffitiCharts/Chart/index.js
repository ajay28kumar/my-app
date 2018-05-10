/* eslint react/require-default-props: 0 */
import React from 'react';
import DrawChart from '../DrawChart';

const Chart = (props) => {
  
  return <DrawChart getChart={props.getChart}/>
  
};

export default Chart;