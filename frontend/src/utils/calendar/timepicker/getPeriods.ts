import { ITime } from "@/interfaces/calendar.interface"
import moment from "moment"
import { PERIOD_INTERVAL } from "./constants"

export const getPeriods = (startAt?: string, endAt?: string, includeLast?: boolean): ITime[] => {
    const startTime = moment(startAt, "HH:mm")
    const endTime = moment(endAt, "HH:mm")

    const periods: ITime[] = [],
        date = moment(startTime),
        startPeriod = startTime.hours()  * 60 / PERIOD_INTERVAL,
        endPeriod = endTime.hours() * 60 / PERIOD_INTERVAL

    const pushPeriod = () => {
        periods.push({time: date.format("HH:mm")})
    }

    pushPeriod()
    
    for (let i = startPeriod; i < endPeriod - 1; i++) {
        date.add(PERIOD_INTERVAL, "minutes")
        pushPeriod()
    }

    if(includeLast) {
        date.add(PERIOD_INTERVAL, "minutes")
        pushPeriod()
    }

    return periods
}