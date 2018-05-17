import api from '../../api/index';
import types from '../../action_types/index';

export default (uid, {dispatch}) => {
    dispatch({type: types.GRAFFITI_PAGE_REQUEST, payload: {type: 'graffitiChart', apiStatus: 'request'}});
    api
        .post('/get-graffiti-charts')
        .then(response => {
            dispatch({
                type: types.GRAFFITI_PAGE_SUCCESS,
                payload: {type: 'graffitiChart', apiStatus: 'success', data: response.data}
            });
        })
        .catch(error => {
            dispatch({type: types.GRAFFITI_PAGE_ERROR, payload: {type: 'graffitiChart', apiStatus: 'error'}});
            console.log('get graffiti charts error', error);
        });
};
