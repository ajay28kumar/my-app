/* eslint react/require-default-props: 0 */
import React from 'react';
import DrawChart from '../DrawChart';

const Chart = ({getChart, bounds}) => <DrawChart bounds={bounds} getChart={getChart}/>

export default Chart;