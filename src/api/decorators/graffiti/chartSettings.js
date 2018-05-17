/* eslint camelcase: 0 */

const baseValue = {};


export default (baseline = baseValue, payload = {}) => {

    return {
        ...baseline,
        ...payload,
    }
}