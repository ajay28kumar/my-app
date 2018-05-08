/* global window */
import moment from 'moment';

const inchesToFeet = inches => `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`;
const inchesToCm = inches => `${Math.floor(inches * 2.54)}`;
const epoch = t => moment(`${t} +05:30`, 'YYYYMMDDHHmmss Z').valueOf();
const momentParse = t => moment(epoch(t));

const timestamp = t => momentParse(t).valueOf();
const secs = t => momentParse(t).valueOf() / 1000;
const timekey = t => momentParse(t).valueOf() / 10000000000000;

const asFullDate = t => momentParse(t).format('DD MMM YYYY');

const hourMins = (h = 0, m = 0) => {
  if (!h && !m) {
    return '';
  }
  if (h >= 12) {
    return `${h - 12}:${m < 10 ? `0${m}` : m} PM`;
  }
  return `${h}:${m < 10 ? `0${m}` : m} AM`;
};

const hourMinsSecs = (h = 0, m = 0, s = 0) => {
  if (!h && !m) {
    return '';
  }
  if (h >= 12) {
    return `${h - 12}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} PM`;
  }
  return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} AM`;
};

const asT = t => momentParse(t).valueOf();

const asDate = t =>
  momentParse(t).calendar(null, {
    sameDay: 'h:mmA',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD/MM/YYYY',
  });

const asTime = t =>
  momentParse(t).calendar(null, {
    sameDay: 'h:mmA',
    lastDay: 'h:mmA',
    lastWeek: 'h:mmA',
    sameElse: 'h:mmA',
    nextDay: 'h:mmA',
    nextWeek: 'h:mmA',
  });

const asRawTime = t =>
  moment(t).calendar(null, {
    sameDay: 'h:mmA',
    lastDay: 'h:mmA',
    lastWeek: 'h:mmA',
    sameElse: 'h:mmA',
    nextDay: 'h:mmA',
    nextWeek: 'h:mmA',
  });

const asTs = t => moment(t).format('YYYYMMDDHHmmss');

const asDob = dt => moment(`${dt}`, 'YYYYMMDD').format('D-MMM-YYYY');
const asTob = time => {
  const [h, m, s] = `${time}`.split(':').map(i => parseInt(i || 0, 10));
  if (s > 0) {
    return hourMinsSecs(h, m, s);
  }
  return hourMins(h, m);
};

const sunSign = dob => {
  let sign;

  const monthAndDay = parseInt(String(dob).substr(4, 4), 10);
  if (!monthAndDay) {
    return sign;
  }

  if (monthAndDay >= 101 && monthAndDay <= 119) sign = 'Capricorn';
  else if (monthAndDay >= 120 && monthAndDay <= 218) sign = 'Aquarius';
  else if (monthAndDay >= 219 && monthAndDay <= 320) sign = 'Pisces';
  else if (monthAndDay >= 321 && monthAndDay <= 420) sign = 'Aries';
  else if (monthAndDay >= 421 && monthAndDay <= 521) sign = 'Taurus';
  else if (monthAndDay >= 522 && monthAndDay <= 621) sign = 'Gemini';
  else if (monthAndDay >= 622 && monthAndDay <= 722) sign = 'Cancer';
  else if (monthAndDay >= 723 && monthAndDay <= 822) sign = 'Leo';
  else if (monthAndDay >= 823 && monthAndDay <= 923) sign = 'Virgo';
  else if (monthAndDay >= 924 && monthAndDay <= 1022) sign = 'Libra';
  else if (monthAndDay >= 1023 && monthAndDay <= 1122) sign = 'Scorpio';
  else if (monthAndDay >= 1123 && monthAndDay <= 1221) sign = 'Sagittarius';
  else if (monthAndDay >= 1222 && monthAndDay <= 1231) sign = 'Capricorn';
  else sign = '-';

  return sign;
};

const timeAgo = t => {
  const target = momentParse(t);
  const now = moment();
  const hours = now.diff(target, 'hours');
  const days = now.diff(target, 'days');
  const weeks = now.diff(target, 'weeks');
  const months = now.diff(target, 'months');
  if (months >= 1) {
    return 'over a month ago';
  } else if (weeks >= 2) {
    return `${weeks} weeks ago`;
  } else if (weeks === 1) {
    return '1 week ago';
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours >= 1) {
    return `a few hours ago`;
  }
  return 'a few mins ago';
};

const dateTimeAgo = t => {
  const target = momentParse(t);
  const now = moment();
  const hours = now.diff(target, 'hours');
  const days = now.diff(target, 'days');
  const date = momentParse(t).format('DD MMM');
  if (days >= 2) {
    return `${date}`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours >= 1) {
    return `few hours ago`;
  }
  return 'few mins ago';
};

const asDate2 = t => {
  const ago = timeAgo(t);
  return momentParse(t).calendar(null, {
    sameDay: `[${ago}]`,
    lastDay: '[Yesterday]',
    lastWeek: 'DD MMM',
    sameElse: 'DD MMM',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD MMM',
  });
};

const strnorm = (str, n = 0) => (!str || str === 'null' || str === '' || str === 'undefined' || `${str}`.length <= n ? null : `${str}`);

const arrnorm = arr => (!arr || arr === 'null' || arr === '' || arr === 'undefined' || arr === '[]' || arr.length === 0 ? [] : arr);

export {
  arrnorm,
  strnorm,
  timestamp,
  secs,
  timekey,
  asFullDate,
  asT,
  asDate,
  asDate2,
  asTime,
  asRawTime,
  asTs,
  inchesToFeet,
  inchesToCm,
  sunSign,
  timeAgo,
  dateTimeAgo,
  epoch,
  hourMins,
  asDob,
  asTob,
};
