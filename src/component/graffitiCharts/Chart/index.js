/* eslint react/require-default-props: 0 */
import React from 'react';
import DrawChart from '../DrawChart';

const Chart = ({getChart, bounds}) => {
    const {width} = bounds || {width: 0};
    const chartMargin = {top: 80, bottom: 20, left: 10, right: 10};
    const axisTextMargin = {x: 20, y: 70};
    const dimSVG = {width: width * 0.95, height: width * 0.62};
    const dimChart = {
        width: dimSVG.width - chartMargin.left - chartMargin.right,
        height: dimSVG.height - chartMargin.top - chartMargin.bottom
    };
    const axisLengths = {x: dimChart.width - axisTextMargin.y, y: dimChart.height - axisTextMargin.x};
    const axisBaseLoc = {xax: {x: 0, y: axisLengths.y + chartMargin.top}, yax: {x: axisLengths.x + chartMargin.left, y: 0}};
    const dimensions = {chartMargin, axisTextMargin, dimSVG, dimChart, axisLengths, axisBaseLoc, startTick: 0, endTick: 0};

    return <DrawChart dimensions={dimensions} getChart={getChart}/>
}

export default Chart;