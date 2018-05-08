/* eslint react/require-default-props: 0 */
import React from 'react';
import Chart from "../Chart";

const Charts = (props) => {
  
  const {graffiti} = props;
  const {getGraffitiCharts} = graffiti || {};
  const {getChart} = getGraffitiCharts || {};
  return <Chart getChart={getChart}/>
  
};


export default Charts;