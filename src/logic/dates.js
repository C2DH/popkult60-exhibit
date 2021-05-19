import { DateTime } from 'luxon'
import isEmpty from 'lodash/isEmpty'

export const getDateFromMetadata = ({ date, start_date, end_date }) => {
  if (!isEmpty(date)) {
    return date
  }
  try{
    const startDate = DateTime.fromISO(start_date)
    const endDate = DateTime.fromISO(end_date)
    const diff = endDate.diff(startDate, ['years', 'months', 'days']).toObject()
    return JSON.stringify(diff)
  } catch(e) {
    console.error(e)
    return '(invalid date)'
  }
}
