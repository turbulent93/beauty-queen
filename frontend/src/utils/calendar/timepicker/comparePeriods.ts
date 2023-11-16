import { ITime } from "@/interfaces/calendar.interface"
import moment, { Moment } from "moment"
import { PERIOD_INTERVAL } from "./constants"

const getMinutes = (d: Moment) => {
    return d.minutes() < PERIOD_INTERVAL ? 0 : PERIOD_INTERVAL
}

export const comparePeriods = (p: ITime, start: Moment, end: Moment): boolean => {
    const date = moment(p.time, "HH:mm")
    const startBound = start.set("minute", getMinutes(start))
    const endBound = end.set("minute", getMinutes(end))
    
    return (date.isSame(startBound) || date.isAfter(startBound)) && (date.isSame(endBound) || date.isBefore(endBound))
}