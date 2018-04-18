/* eslint camelcase: 0 */
import types from '../../action_types';

export default (source, action, value) => (dispatch, getState) => {
  
  switch (action) {
    case 'changePreset':
      dispatch({type: types.CHANGE_PRESET_VALUE, payload: {value}});
      return null;
    
    default:
      console.log('TO DO action', source, action);
      return null;
  }
  
};
