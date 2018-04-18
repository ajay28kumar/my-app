/* global document, window */
/* eslint no-underscore-dangle: 0 */

import types from "../../action_types";

export const initialState = {
  modalStatus: false,
  template: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case  types.MODAL_SHOW:
      return {...state, modalStatus: true};
    case  types.MODAL_HIDE:
      return {...state, modalStatus: false};
    default:
      return state;
  }
}