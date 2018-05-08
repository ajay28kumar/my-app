/* eslint-disable no-underscore-dangle */
import getGraffitiCharts from './getGraffitiCharts';

export default (history, location, params, cookies) => (dispatch, getState) => {
  console.log('cookies : ', cookies);
  return getGraffitiCharts(undefined, {dispatch, getState})
};
