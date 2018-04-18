import types from '../../action_types';

export default (source, action, value) => (dispatch, getState) => {
  
  switch (action) {
    case 'closeModal': {
      return dispatch({type: types.MODAL_HIDE, payload: {modal: value}});
    }
    case 'openModal': {
      return dispatch({type: types.MODAL_SHOW, payload: {modal: value}});
    }
    default:
      console.log('TO DO doModalAction', source, action, value);
      return null;
  }
};
