/* eslint react/require-default-props: 0 */
import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import {parseDate} from "../../../helpers/utils";
import {getLayers, getXaxis} from "../../../helpers/drawChart";

// let chartMargin = {top: 80, bottom: 20, left: 10, right: 10};
// const axisTextMargin = {x: 20, y: 70};
// let dimSVG = {width: (window.innerWidth - 50), height: 0};
// dimSVG.height = dimSVG.width * 0.612;
// const dimChart = {
//     width: dimSVG.width - chartMargin.left - chartMargin.right,
//     height: dimSVG.height - chartMargin.top - chartMargin.bottom
// };
// const axisLengths = {x: dimChart.width - axisTextMargin.y, y: dimChart.height - axisTextMargin.x};
// const axisBaseLoc = {xax: {x: 0, y: axisLengths.y + chartMargin.top}, yax: {x: axisLengths.x + chartMargin.left, y: 0}};
//


//TODO : remove these constants from here
let scales = [];
let layers = [];
let scaleX;
let cxss = {};
let cx_seriesCol = '';
let startTick;
let endTick;
let filtData = [];
let data_max;
let data_min;


// Set cushion for last data point on x-axis. So that the last bar doesnt cross the x-axis
// const xbarCush = 0;	// NOT ENABLED YET. For time axis, the bars need to end at the recort_date so the issue didnt arise.


class DrawChart extends React.PureComponent {
    constructor(props) {
        super(props);
        scales = [];
        layers = [];
        scaleX = '';
        cxss = {};
        cx_seriesCol = '';
        startTick = 0;
        endTick = 0;
        filtData = [];
        data_max = 0;
        data_min = 0;

    }

    getYaxis = (i, tickVals) => {
        const {getChart, dimensions} = this.props || {};
        const {chartAxis} = getChart || {};
        const {axisLengths, dimChart, axisTextMargin, chartMargin, axisBaseLoc} = dimensions || {};
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
        console.log('translate 1 y axis: ', axisBaseLoc.yax);
        layers[0].append("g")
            .attr("id", "yaxg" + i)
            .attr("transform", `translate(${axisBaseLoc.yax.x},${axisBaseLoc.yax.y})`)
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
        switch (type) {
            case 'line': {
                const line = d3.line()
                    .x((d) => scaleX(d['record_date']))
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
                console.log('handle data here : ', type);
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
        const {dimensions} = this.props || {};
        const {axisLengths, chartMargin} = dimensions || {};
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


    makeVerticalRulers = (chartSetting) => {
        const {dimensions} = this.props || {};
        const {vRuler} = chartSetting || {};
        const {axisBaseLoc, chartMargin} = dimensions || {};
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


    makeHorizontalRulers = (chartSetting) => {
        const {hRuler} = chartSetting || {};

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

    makePeriods = (chartSetting) => {
        const {periods} = chartSetting || {};

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

    };

    render() {

        const {getChart, dimensions} = this.props || {};
        const {chartMargin, dimSVG, axisBaseLoc} = dimensions || {};
        const {chartSetting, chartAxis, series_data, stock_data} = getChart || {};
        const node = ReactFauxDOM.createElement('svg');
        const canva = d3.select(node)
            .attr("height", dimSVG.height)
            .attr("width", dimSVG.width)
            .style("background-color", chartSetting.canvas.backColor)
            .append("g")
            .attr("id", "svgg")
            .attr("transform", "translate(0,0)");
        layers = getLayers(chartAxis, canva);
        series_data.forEach(d => {
            d.TTMValue = +d.TTMValue;

        });
        stock_data.forEach(d => {
            d.price = +d.price;
        });

        //TODO:  handle  layers 0th element here from getXaxis
        const {ax, scaleX: xScale} = getXaxis(this.props, dimensions);
        scaleX = xScale;
        console.log('translate 0 : ', axisBaseLoc.xax);
        layers[0].append("g")
            .attr("id", "xaxg")
            .attr("transform", "translate(" + axisBaseLoc.xax.x + "," + axisBaseLoc.xax.y + ")")
            .attr("class", "axis")
            .call(ax);


        chartAxis.forEach((item, index) => {
            cxss = JSON.parse(item.series_setting);
            const cx_seriesType = item.code.split(".")[0];	//stock_data //series_data
            cx_seriesCol = item.code.split(".")[1]; //price //TTMValue
            const cx_seriesFilter1 = item.label.split(":")[0]; //AAPL
            const cx_seriesFilter2 = item.label.split(":")[1]; //CLOSE_PRICE
            const dataCol1 = "ticker";
            const dataCol2 = (cx_seriesType === "series_data") ? "seriescode" : "price_type";
            filtData = getChart[cx_seriesType].filter(v => v[dataCol1] === cx_seriesFilter1 & v[dataCol2] === cx_seriesFilter2);
            filtData.forEach((d) => {
                d[cx_seriesCol] = +d[cx_seriesCol] / cxss.divisor
            });
            data_max = d3.max(filtData, d => d[cx_seriesCol]);
            data_min = d3.min(filtData, d => d[cx_seriesCol]);
            d3.selectAll('#xaxg .tick text')
                .attr("fill", chartSetting.xaxis.color)
                .attr("font-size", chartSetting.xaxis.fs);

            const tickVals = this.tickCalc();
            scales[index] = this.getScale();
            this.getYaxis(index, tickVals);
            this.getPath(index);

            // Styling
            d3.selectAll('.axis .tick line')
                .attr("stroke", chartSetting.grid.color)
                .attr("stroke-width", chartSetting.grid.strokeWidth)
                .attr("stroke-dasharray", chartSetting.grid.dashArray);

            const title_y = chartMargin.top / 2.25;
            layers[layers.length - 1].append("text")
                .attr("id", "ChartTitle")
                .text(chartSetting.title.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", title_y)
                .attr("text-anchor", "start")
                .attr("font-size", chartSetting.title.fs)
                .attr("fill", chartSetting.title.color);

            layers[layers.length - 1].append("text")
                .attr("id", "chartSubTitle")
                .text(chartSetting.subTitle.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", title_y + 25)
                .attr("text-anchor", "start")
                .attr("font-size", chartSetting.subTitle.fs)
                .attr("fill", chartSetting.subTitle.fs);

            layers[layers.length - 1].append("text")
                .attr("id", "watermark")
                .text(chartSetting.watermark.text)
                .attr("x", chartMargin.left + 20)
                .attr("y", axisBaseLoc.xax.y - 10)
                .attr("text-anchor", "start")
                .attr("font-size", chartSetting.watermark.fs)
                .attr("fill", chartSetting.watermark.fs);

        });

        // this.makeAnnotations(chartSetting);
        this.makeVerticalRulers(chartSetting);
        this.makeHorizontalRulers(chartSetting);
        this.makePeriods(chartSetting);

        return node.toReact()
        // return <h1>Hello world</h1>
    }

};

export default DrawChart;



