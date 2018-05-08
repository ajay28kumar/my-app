/* eslint react/require-default-props: 0 */
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

const chartsPerRow = 1;
const chartMargin = {top: 80, bottom: 20, left: 30, right: 10}
const axisTextMargin = {x: 20, y: 70}
const dimSVG = {width: window.innerWidth / chartsPerRow, height: 0}
dimSVG.height = dimSVG.width * 0.612
const dimChart = {
  width: dimSVG.width - chartMargin.left - chartMargin.right,
  height: dimSVG.height - chartMargin.top - chartMargin.bottom
}

const axisLengths = {x: dimChart.width - axisTextMargin.y, y: dimChart.height - axisTextMargin.x}
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
  
  
  getXaxis = (chartAxis) => {
    axisLengths.x = dimChart.width - (chartAxis.length) * axisTextMargin.y;
  }
  
  render() {
    const {getChart} = this.props || {};
    // console.log('getChart : ', getChart);
    
    const {chart_axis: chartAxis} = getChart || {};
    
    data.forEach(function (d) {
      d.value = +d.value;
    });
    
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    
    const x = d3.scaleTime()
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .range([height, 0]);
    
    const xAxis = d3.axisBottom(x);
    
    const yAxis = d3.axisRight(y);
    
    
    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
    
    x.domain(d3.extent(data, function (d) {
      return d.date
    }));
    y.domain(d3.extent(data, function (d) {
      return d.value
    }));
    
    const line = d3.line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.value)
      });
    
    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);
    
    return node.toReact()
  }
  
};


export default DrawChart;


/*
const data = [
  {date: new Date(2007, 3, 24), value: 93.24},
  {date: new Date(2007, 3, 25), value: 95.35},
  {date: new Date(2007, 3, 26), value: 98.84},
  {date: new Date(2007, 3, 27), value: 99.92},
  {date: new Date(2007, 3, 30), value: 99.80},
  {date: new Date(2007, 4,  1), value: 99.47}
];
 */


/*
const chartMargin = {top: 80, bottom: 20, left: 30, right: 10};
    const axisTextMargin = {x: 20, y: 70};
    const dimSVG = {width: window.innerWidth, height: 0};
    dimSVG.height = dimSVG.width * 0.612;
    const dimChart = {
      width: dimSVG.width - chartMargin.left - chartMargin.right,
      height: dimSVG.height - chartMargin.top - chartMargin.bottom
    };
    const axisLengths = {x: dimChart.width - axisTextMargin.y, y: dimChart.height - axisTextMargin.x};
    const axisBaseLoc = {
      xax: {x: 0, y: axisLengths.y + chartMargin.top},
      yax: {x: axisLengths.x + chartMargin.left, y: 0}
    };
    
    const parseDate = d3.timeParse("%Y-%m-%d");
    const timeFormat = d3.timeFormat("%Y-%m-%d");
    const xbarCush = 0;
    const CS = JSON.parse(chart_settings);  // CS: chart settings
    const CX = chart_axis; //Cx: chart_axis
    const scales = [];
    const axis = [];
    const paths = [];
    const layers = [];
    
    // For getting serieslevel info
    let cxss;
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
    
    const verbose = true;
    
    let canva;
    let scaleX;
    const chartID = 1;
    
    const setData = function () {
      series_data.forEach(function (d, i) {
        d.record_date = parseDate(d.record_date)
      });
      stock_data.forEach(function (d, i) {
        d.record_date = parseDate(d.record_date)
      });
      stock_data.forEach(function (d, i) {
        d.price = +d.price
      });
      series_data.forEach(function (d, i) {
        d.TTMValue = +d.TTMValue
      }); //DIVISOR TAKEN OUT
    };
    
    const getScale = function () {
      let res;
      
      
      switch (cxss.scale) {
        case "linear"  :
          res = d3.scaleLinear().domain([startTick, endTick]).range([axisLengths.y + chartMargin.top, chartMargin.top]);
          break;
        case "time"    :
          res = "time";
          break;
      }
      return res;
    } //getScale end
    
    const getXaxis = function () {
      axisLengths.x = dimChart.width - (CX.length) * axisTextMargin.y;
      
      if (chart_type == "SCATTER") {
      
      }
      else {   // THE CASE OF TIME SERIES. X-AXIS IS DEFINED BY RECORD DATE
        
        scaleX = d3.scaleTime()
          .range([chartMargin.left, axisLengths.x + chartMargin.left])
          .domain([parseDate(JS.data.getChart.from_date), parseDate(JS.data.getChart.to_date)]);
        
        let ax = d3.axisBottom()
          .scale(scaleX)
          .tickFormat(d3.timeFormat("%Y"))
          .ticks()
          .tickSizeInner(-axisLengths.y)
          .tickSizeOuter(0)
          .tickPadding(10);
      }
      console.log(scaleX.range()[0]);
      layers[0].append("g")
        .attr("id", "xaxg")
        .attr("transform", "translate(" + axisBaseLoc.xax.x + "," + axisBaseLoc.xax.y + ")")
        .attr("class", "axis")
        .call(ax);
      
      return ax;
    };
    
 */