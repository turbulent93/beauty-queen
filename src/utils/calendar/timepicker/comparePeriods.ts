import { ITime } from "@/interfaces/calendar.interface"
import { PERIOD_INTERVAL } from "./constants"
import { toDate } from "./toDate"

const getMinutes = (d: Date) => {
    return d.getMinutes() < PERIOD_INTERVAL ? 0 : PERIOD_INTERVAL
}

export const comparePeriods = (p: ITime, start: Date, end: Date) => {
    const date = toDate({hours: p.hours, minutes: p.minutes})
    const startBound = toDate({hours: start.getHours(), minutes: getMinutes(start)})
    const endBound = toDate({hours: end.getHours(), minutes: getMinutes(end)})
    
    return startBound <= date && date <= endBound
}