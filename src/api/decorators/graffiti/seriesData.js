/* eslint camelcase: 0 */

import {parseDate} from "../../../helpers/utils";

const baseValue = {};


export default (baseline = baseValue, payload = {}) => {
    const {record_date: recordDate} = payload;
    return {
        ...baseline,
        ...payload,
        record_date: parseDate(recordDate)
    }
}