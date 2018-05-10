/* eslint react/require-default-props: 0 */
import React from 'react';
import Chart from "../Chart";

const Charts = (props) => {

    const {graffiti} = props;
    const {getGraffitiCharts} = graffiti || {};
    const {getChart, apiStatus} = getGraffitiCharts || {};
    if (apiStatus === 'success') {
        return <Chart getChart={getChart}/>
    }

    return null


};


export default Charts;