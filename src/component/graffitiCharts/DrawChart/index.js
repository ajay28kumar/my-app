/* eslint react/require-default-props: 0 */
import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom'

const chartsPerRow = 1;
const chartMargin = {top: 80, bottom: 20, left: 30, right: 10};
const axisTextMargin = {x: 20, y: 70};
const dimSVG = {width: window.innerWidth / chartsPerRow, height: 0};
dimSVG.height = dimSVG.width * 0.612;
const dimChart = {
    width: dimSVG.width - chartMargin.left - chartMargin.right,
    height: dimSVG.height - chartMargin.top - chartMargin.bottom
};

//TODO : remove these constants from here
const scales = [];
const axis = [];
const paths = [];
let layers = [];
let scaleX;
let cxss = {};
let cx_seriesType;
let cx_seriesCol;
let cx_seriesFilter1;
let cx_seriesFilter2;
let dataCol1;
let dataCol2;
let startTick;
let endTick;
let perTick;
let tickVals;
let filtData;
let data_max;
let data_min;

const axisLengths = {x: dimChart.width - axisTextMargin.y, y: dimChart.height - axisTextMargin.x};
const axisBaseLoc = {xax: {x: 0, y: axisLengths.y + chartMargin.top}, yax: {x: axisLengths.x + chartMargin.left, y: 0}};

const parseDate = d3.timeParse("%Y-%m-%d");
const timeFormat = d3.timeFormat("%Y-%m-%d");

// Set cushion for last data point on x-axis. So that the last bar doesnt cross the x-axis
const xbarCush = 0;	// NOT ENABLED YET. For time axis, the bars need to end at the recort_date so the issue didnt arise.


const data = [
    {date: new Date(2007, 3, 24), value: 93.24},
    {date: new Date(2007, 3, 25), value: 95.35},
    {date: new Date(2007, 3, 26), value: 98.84},
    {date: new Date(2007, 3, 27), value: 99.92},
    {date: new Date(2007, 3, 30), value: 99.80},
    {date: new Date(2007, 4, 1), value: 99.47}
];

class DrawChart extends React.PureComponent {


    getXaxis = () => {
        let ax;
        const {getChart} = this.props || {};
        // console.log('getChart : ', getChart);
        const {chart_axis: chartAxis, chart_type: chartType} = getChart || {};
        axisLengths.x = dimChart.width - (chartAxis.length) * axisTextMargin.y;
        if (chartType !== "SCATTER") {
            scaleX = d3.scaleTime()
                .range([chartMargin.left, axisLengths.x + chartMargin.left])
                .domain([parseDate(getChart.from_date), parseDate(getChart.to_date)]);
            ax = d3.axisBottom()
                .scale(scaleX)
                .tickFormat(d3.timeFormat("%Y"))
                .ticks()
                .tickSizeInner(-axisLengths.y)
                .tickSizeOuter(0)
                .tickPadding(10);
        }

        //TODO:  handle  layers 0th element here
        layers[0].append("g")
            .attr("id", "xaxg")
            .attr("transform", "translate(" + axisBaseLoc.xax.x + "," + axisBaseLoc.xax.y + ")")
            .attr("class", "axis")
            .call(ax);


        return ax;
    };


    getYaxis = (i) => {
        const {getChart} = this.props || {};
        // console.log('getChart : ', getChart);
        const {chart_axis: chartAxis} = getChart || {};
        axisLengths.x = dimChart.width - (chartAxis.length - i) * axisTextMargin.y;
        axisBaseLoc.yax.x = axisLengths.x + chartMargin.left;

        const ay = d3.axisRight()
            .scale(scales[i])
            .tickValues(tickVals)
            //			        .tickSizeOuter(cxss.outTick)
            .tickSizeOuter(0)
            .tickSizeInner(-10)
            .tickPadding(8);
        if (i === 0) {
            ay.tickSizeInner(-axisLengths.x);
        }
        layers[0].append("g")
            .attr("id", "yaxg" + i)
            .attr("transform", "translate(" + axisBaseLoc.yax.x + "," + axisBaseLoc.yax.y + ")")
            .attr("class", "axis")
            .call(ay);

        d3.selectAll("#yaxg" + i + ' .tick text')
            .attr("fill", cxss.color)
            .attr("font-size", "13px");

        layers[0].append("text")
            .attr("id", "yaxg" + i + "-label")
            .text(cxss.label)
            .attr("text-anchor", "end")
            .attr("x", -axisBaseLoc.yax.y - chartMargin.top - 5)
            .attr("y", axisBaseLoc.yax.x - 5)
            .attr("fill", cxss.color)
            .attr("font-size", cxss.fs)
            .attr("transform", "rotate(-90)");


        return ay;
    };

    getPath = (i) => {
        const {type} = cxss || {};
        //2009-01-02
        console.log('scaleX : ', scaleX(`2009-01-02`));

        switch (type) {
            case 'line': {
                const line = d3.line()
                    .x((d) => {
                        console.log('scaleX', d);
                        return scaleX(d['record_date'])
                    })
                    .y((d) => scales[i](d[cx_seriesCol])
                    );
                layers[cxss.layer].append("path")
                    .data([filtData])
                    .attr("d", line)
                    .attr("id", type + i)
                    .attr("fill", "none")
                    .attr("stroke", cxss.color)
                    .attr("stroke-width", cxss.strokeWidth);
            }
                break;
            default:
                //TODO: handle other types
                console.log('handle data here');
                break;
        }
    };


    tickCalc = () => {
        const res = [];
        const diff = data_max - data_min;
        const tmp = Math.log10(diff / (4 / 2));
        const fd = Math.floor(Math.pow(10, tmp - Math.floor(tmp)));
        const perTick = fd / 2 * Math.pow(10, Math.floor(tmp));
        if (data_min < 0) {
            startTick = (Math.floor(data_min / perTick) - 1) * perTick
        }
        else {
            startTick = Math.max(0, (Math.floor(data_min / perTick) - 1) * perTick)
        }
        endTick = (Math.ceil(data_max / perTick) + 1) * perTick;
        const nTicks = Math.ceil((endTick - startTick) / perTick);
        for (let iT = 0; iT < nTicks; iT++) {
            if (iT === 0) {
                res[iT] = startTick
            }
            else {
                res[iT] = res[iT - 1] + perTick;
            }
        }
        res.push(endTick);
        return res
    };


    getScale = () => {

        switch (cxss.scale) {
            case "linear"    :
                return d3.scaleLinear().domain([startTick, endTick]).range([axisLengths.y + chartMargin.top, chartMargin.top]);
            case "time"        :
                return "time";
            default:
                return null
        }
    };//getScale end

    makeAnnotations = (chartSetting) => {
        //TODO : resolve d3 annotation from d3 lib
        // const annType = d3.annotationCalloutElbow; //d3.annotationLabel;
        // const annsList = d3.annotation()
        //     .editMode(true)
        //     .type(annType)
        //     .accessors({
        //         x: d => scaleX(parseDate(d.xval)),
        //         y: d => scales[0](d.yval)
        //     })
        //     .annotations(chartSetting.anns);
        //
        // layers[layers.length - 1].attr("class", "annotation-group")
        //     .call(annsList);
    };


    makeVerticalRulers = (chartSettings) => {
        const {vRuler} = chartSettings || {};
        vRuler.forEach((item, vRC) => {
            layers[layers.length - 1].append("line")
                .attr("x1", scaleX(parseDate(item.val)))
                .attr("x2", scaleX(parseDate(item.val)))
                .attr("y1", scales[0].range()[0])
                .attr("y2", scales[0].range()[1])
                .style("fill", "none")
                .style("stroke", item.settings.color)
                .style("stroke-width", item.settings.strokeWidth)
                .style("stroke-dasharray", item.settings.dashArray);

            layers[layers.length - 1].append("text")
                .attr("id", "label1-V-" + vRC)
                .text(item.label_line1)
                .attr("text-anchor", "end")
                .attr("x", -scales[0].range()[1] - 5)
                .attr("y", scaleX(parseDate(item.val)) - 5)
                .attr("fill", item.settings.color)
                .attr("font-size", 12)
                .attr("transform", "rotate(-90)");
            layers[layers.length - 1].append("text")
                .attr("id", "label2-V-" + vRC)
                .text(item.label_line2)
                .attr("text-anchor", "end")
                .attr("x", -axisBaseLoc.yax.y - chartMargin.top - 5)
                .attr("y", scaleX(parseDate(item.val)) + 13)
                .attr("fill", item.settings.color)
                .attr("font-size", 12)
                .attr("transform", "rotate(-90)");
        });

    };


    makeHorizontalRulers = (chartSettings) => {
        const {hRuler} = chartSettings || {};

        hRuler.forEach((item, hRC) => {
            layers[layers.length - 1].append("line")
                .attr("x1", scaleX.range()[0])
                .attr("x2", scaleX.range()[1])
                .attr("y1", scales[0](item.val))
                .attr("y2", scales[0](item.val))
                .style("fill", "none")
                .style("stroke", item.settings.color)
                .style("stroke-width", item.settings.strokeWidth)
                .style("stroke-dasharray", item.settings.dashArray);

            layers[layers.length - 1].append("text")
                .attr("id", "label1-V-" + hRC)
                .text(item.label_line1)
                .attr("text-anchor", "start")
                .attr("x", scaleX.range()[0] + 5)
                .attr("y", scales[0](item.val) - 5)
                .attr("fill", item.settings.color)
                .attr("font-size", item.settings.fs);

            layers[layers.length - 1].append("text")
                .attr("id", "label2-V-" + hRC)
                .text(item.label_line2)
                .attr("text-anchor", "start")
                .attr("x", scaleX.range()[0] + 5)
                .attr("y", scales[0](item.val) + 12)
                .attr("fill", item.settings.color)
                .attr("font-size", item.settings.fs);
        })

    };

    makePeriods = (chartSettings) => {
        const {periods} = chartSettings || {};

        periods.forEach((item, pC) => {
            layers[0].append("rect")
                .attr("x", scaleX(parseDate(item.begX)))
                .attr("y", scales[0].range()[1])
                .attr("height", scales[0].range()[0] - scales[0].range()[1])
                .attr("width", scaleX(parseDate(item.endX)) - scaleX(parseDate(item.begX)))
                .style("fill", item.bkgColor)
                .style("opacity", item.opacity)
                .style("stroke", item.boundryCol)
                .style("stroke-width", item.boundryWidth)

            layers[0].append("text")
                .attr("id", "label1-P-" + pC)
                .text(item.label)
                .attr("text-anchor", "end")
                .attr("x", -scales[0].range()[1] - 5)
                .attr("y", scaleX(parseDate(item.begX)) - 5)
                .attr("fill", item.labcolor)
                .attr("font-size", 12)
                .attr("transform", "rotate(-90)");
        })

    }

    render() {
        const {getChart} = this.props || {};
        const {chart_settings, chart_axis: chartAxis, series_data: seriesData, stock_data: stockData} = getChart || {};
        const chartSettings = JSON.parse(chart_settings);
        const canva = d3.select("body").append("svg")
            .attr("height", dimSVG.height)
            .attr("width", dimSVG.width)
            .style("background-color", chartSettings.canvas.backColor)
            .append("g")
            .attr("id", "svgg")
            .attr("transform", "translate(0,0)");
        layers = getLayers(chartAxis, canva);
        seriesData.forEach(d => {
            d.record_date = parseDate(d.record_date);
            d.TTMValue = +d.TTMValue;

        });
        stockData.forEach(d => {
            d.price = +d.price;
            d.TTMValue = +d.TTMValue;
        });
        const xAxis = this.getXaxis();

        chartAxis.forEach((item, index) => {
            cxss = JSON.parse(item.series_setting);
            cx_seriesType = item.code.split(".")[0];	//stock_data //series_data
            cx_seriesCol = item.code.split(".")[1]; //price //TTMValue
            cx_seriesFilter1 = item.label.split(":")[0]; //AAPL
            cx_seriesFilter2 = item.label.split(":")[1]; //CLOSE_PRICE
            dataCol1 = "ticker";
            if (cx_seriesType === "series_data") {
                dataCol2 = "seriescode";
            } else {
                dataCol2 = "price_type";
            }
            filtData = getChart[cx_seriesType].filter(v => v[dataCol1] === cx_seriesFilter1 & v[dataCol2] === cx_seriesFilter2);
            filtData.forEach((d) => {
                d[cx_seriesCol] = +d[cx_seriesCol] / cxss.divisor
            });
            data_max = d3.max(filtData, d => d[cx_seriesCol]);
            data_min = d3.min(filtData, d => d[cx_seriesCol]);
            d3.selectAll('#xaxg .tick text')
                .attr("fill", chartSettings.xaxis.color)
                .attr("font-size", chartSettings.xaxis.fs);

            tickVals = this.tickCalc();
            scales[index] = this.getScale();
            axis[index] = this.getYaxis(index);
            paths[index] = this.getPath(index);

            // Styling
            d3.selectAll('.axis .tick line')
                .attr("stroke", chartSettings.grid.color)
                .attr("stroke-width", chartSettings.grid.strokeWidth)
                .attr("stroke-dasharray", chartSettings.grid.dashArray);

            const title_y = chartMargin.top / 2.25;
            layers[layers.length - 1].append("text")
                .attr("id", "ChartTitle")
                .text(chartSettings.title.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", title_y)
                .attr("text-anchor", "start")
                .attr("font-size", chartSettings.title.fs)
                .attr("fill", chartSettings.title.color);

            layers[layers.length - 1].append("text")
                .attr("id", "chartSubTitle")
                .text(chartSettings.subTitle.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", title_y + 25)
                .attr("text-anchor", "start")
                .attr("font-size", chartSettings.subTitle.fs)
                .attr("fill", chartSettings.subTitle.fs);

            layers[layers.length - 1].append("text")
                .attr("id", "watermark")
                .text(chartSettings.watermark.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", axisBaseLoc.xax.y - 10)
                .attr("text-anchor", "start")
                .attr("font-size", chartSettings.watermark.fs)
                .attr("fill", chartSettings.watermark.fs);

        });

        // this.makeAnnotations(chartSettings);
        this.makeVerticalRulers(chartSettings);
        this.makeHorizontalRulers(chartSettings);
        this.makePeriods(chartSettings);

        const node = ReactFauxDOM.createElement('svg');

        return node.toReact()
        // return <h1>Hello world</h1>
    }

};

const getLayers = (chartAxis, canva) => {
    const res = [];
    for (let nL = 0; nL < chartAxis.length + 2; nL++) {
        res[nL] = canva.append("g").attr("id", "layer" + nL).attr("transform", "translate(0,0)");
    }
    return res;
};
/*
// this.getYaxis(0);
        // data.forEach(function (d) {
        //     d.value = +d.value;
        // });
        //
        // const margin = {top: 20, right: 20, bottom: 30, left: 50};
        // const width = 960 - margin.left - margin.right;
        // const height = 500 - margin.top - margin.bottom;
        //
        //
        // const x = d3.scaleTime()
        //     .range([0, width]);
        //
        // const y = d3.scaleLinear()
        //     .range([height, 0]);
        //
        // // const xAxis = d3.axisBottom(x);
        //
        // const yAxis = d3.axisRight(y);
        //
        //
        // const node = ReactFauxDOM.createElement('svg');
        // const svg = d3.select(node)
        //     .attr('width', width + margin.left + margin.right)
        //     .attr('height', height + margin.top + margin.bottom)
        //     .append('g')
        //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        //
        // svg.append('g')
        //     .attr('class', 'x axis')
        //     .attr('transform', 'translate(0,' + height + ')')
        //     .call(xAxis);
        //
        // svg.append('g')
        //     .attr('class', 'y axis')
        //     .call(yAxis)
        //     .append('text')
        //     .attr('transform', 'rotate(-90)')
        //     .attr('y', 6)
        //     .attr('dy', '.71em')
        //     .style('text-anchor', 'end')
        //     .text('Price ($)');
        //
        // x.domain(d3.extent(data, function (d) {
        //     return d.date
        // }));
        // y.domain(d3.extent(data, function (d) {
        //     return d.value
        // }));
        //
        // const line = d3.line()
        //     .x(function (d) {
        //         return x(d.date)
        //     })
        //     .y(function (d) {
        //         return y(d.value)
        //     });
        //
        // svg.append('path')
        //     .datum(data)
        //     .attr('class', 'line')
        //     .attr('d', line);
        //
        // return node.toReact()

 */

export default DrawChart;


