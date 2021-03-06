/* eslint react/require-default-props: 0 */
import React from 'react';
import Chart from "../Chart";
import {withContentRect} from 'react-measure'

const Charts = withContentRect('bounds')(({measureRef, measure, contentRect, graffiti}) => {
    const {bounds} = contentRect || {};
    const {getGraffitiCharts} = graffiti || {};
    const {getChart, apiStatus} = getGraffitiCharts || {};
    if (apiStatus === 'success') {
        return <Chart bounds={bounds} getChart={getChart}/>
    }

    return <div ref={measureRef}/>


});


export default Charts;