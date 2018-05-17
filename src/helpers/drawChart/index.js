/* eslint react/require-default-props: 0 */

import * as d3 from "d3";

export const getXaxis = (props, dimension) => {
    const {chartMargin, axisLengths, dimChart, axisTextMargin} = dimension || {};
    const {getChart} = props || {};
    const {chartAxis, chartType, fromDate, toDate} = getChart || {};
    axisLengths.x = dimChart.width - (chartAxis.length) * axisTextMargin.y;
    if (chartType !== "SCATTER") {
        const scaleX = d3.scaleTime()
            .range([chartMargin.left, axisLengths.x + chartMargin.left])
            .domain([fromDate, toDate]);
        return {
            ax: d3.axisBottom()
                .scale(scaleX)
                .tickFormat(d3.timeFormat("%Y"))
                .ticks()
                .tickSizeInner(-axisLengths.y)
                .tickSizeOuter(0)
                .tickPadding(10),
            scaleX
        }
    } else {
        return null;
    }
};

export const getLayers = (chartAxis, canva) => {
    const res = [];
    for (let nL = 0; nL < chartAxis.length + 2; nL++) {
        res[nL] = canva.append("g").attr("id", "layer" + nL).attr("transform", "translate(0,0)");
    }
    return res;
};


