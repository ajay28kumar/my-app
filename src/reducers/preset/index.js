/* global document, window */
/* eslint no-underscore-dangle: 0 */

import types from "../../action_types";

export const initialState = {
  songList: [{
    text: 'Rock',
    value: 'Rock'
  },
    {
      text: 'Pop',
      value: 'Pop'
    },
    {
      text: 'Jazz',
      value: 'Jazz'
    },
    {
      text: 'Classical',
      value: 'Classical'
    }],
  selectedSong: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case  types.CHANGE_PRESET_VALUE:
      const {value} = action.payload || {};
      return {...state, selectedSong: value};
    default:
      return state;
  }
}