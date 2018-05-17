import requestService from '../services/requestService';
import decorators from '../decorators'


const getCharts = (logger, data, query, auth) => {
    const request = {
        method: 'post',

        data: {
            query: `
        query{
          getChart(code: "X4"){
            code
            tags
            isPrivate
            from_date
            to_date
            chart_type
            chart_settings
            chart_axis{
              code
              label
              series_setting
            }
            chart_settings
            cik_metrics {
              cik
              ticker
              name
              seriescode
              value
            }
            stock_data {
              cik
              ticker
              name
              price_type
              price
              record_date
              isWeekEnding
              isMonthEnding
              isQuarterEnding
              isYearEnding
              currency_code
            }
            series_data {
              cik
              ticker
              name
              seriescode
              seriesdescription
              record_date
              value
              quarterValue
              TTMValue
              valueType
              currency_code
            }
            user_data {
              id
              type
              utc_timestamp
              value
              utc_timestamp_tl
              value_tl
              x_value
              x_value_tl
              remarks
            }
          }
        }
      `
        },
    };
    return requestService(logger, query, auth, request, d => decorators.graffiti(undefined, d.data))

};


export default {
    getCharts
};
