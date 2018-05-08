/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

export const initialState = {
  getGraffitiCharts: {}
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GRAFFITI_PAGE_REQUEST: {
      const {type, apiStatus} = action.payload || {};
      switch (type) {
        case 'graffitiChart':
          return {
            ...state,
            getGraffitiCharts: {
              ...state.getGraffitiCharts,
              apiStatus
            }
          };
        default:
          return state;
      }
    }
    case types.GRAFFITI_PAGE_SUCCESS: {
      const {type, apiStatus} = action.payload || {};
      switch (type) {
        case 'graffitiChart':
          const {data} = action.payload || {};
          const {getChart} = data || {};
          return {
            ...state,
            getGraffitiCharts: {
              ...state.getGraffitiCharts,
              apiStatus,
              getChart
            }
          };
        default:
          return state;
      }
    }
    case types.GRAFFITI_PAGE_ERROR: {
      const {type, apiStatus} = action.payload || {};
      switch (type) {
        case 'graffitiChart':
          return {
            ...state,
            getGraffitiCharts: {
              ...state.getGraffitiCharts,
              apiStatus
            }
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
}