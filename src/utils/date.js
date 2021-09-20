import moment from 'moment-timezone';

export function convertUtcToTimezone({
    date,
    dateFormat = 'DD/MM/YYYY',
    timeFormat = 'h:mm:ss a',
    isDateOnly,
}) {
  const utcMoment = moment.utc(date, moment.ISO_8601);
  const timeZoneDate = utcMoment.tz(moment.tz.guess(true));
  return isDateOnly ? timeZoneDate.format(`${dateFormat}`) : timeZoneDate.format(`${dateFormat} ${timeFormat}`);
}

const exp = {
    convertUtcToTimezone
}
export default exp;
