import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { dayjs } from 'dayjs';

const moment = extendMoment(Moment);

export const isReservedDate = (date, lodgmentReserves, userReserves) => {
    const joinedReserves = lodgmentReserves.concat(userReserves)
    if(userReserves) {
        const reserveDates = joinedReserves.map( reserve => moment.range(moment(reserve.startDate), moment(reserve.endDate)) )
        return reserveDates.some(reserve => {
            return reserve.contains(date)
        })
    }
    return false
}
