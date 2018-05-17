/* eslint camelcase: 0 */

import {parseDate} from "../../../helpers/utils";
import seriesData from "./seriesData";
import stockData from "./stockData";
import chartSettings from "./chartSettings";

const baseValue = {
    getChart: {}
};

export default (baseline = baseValue, payload = {}) => {
    const {getChart} = payload;
    const {
        user_data: userData,
        code,
        chart_settings: chartSetting,
        chart_axis: chartAxis,
        chart_type: chartType,
        cik_metrics: clickMetrics,
        isPrivate,
        tags,
        from_date: fromDate,
        to_date: toDate,
        series_data,
        stock_data,
    } = getChart || {};

    return {
        ...baseValue,
        getChart: {
            userData,
            code,
            chartSetting: chartSettings(undefined, JSON.parse(chartSetting)),
            chartAxis,
            clickMetrics,
            isPrivate,
            tags,
            chartType,
            fromDate: parseDate(fromDate),
            toDate: parseDate(toDate),
            series_data: series_data.map(d => seriesData(undefined, d)),
            stock_data: stock_data.map(d => stockData(undefined, d)),
        }
    }
};
