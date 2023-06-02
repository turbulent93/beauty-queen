import { ITime } from "@/interfaces/calendar.interface"
import { PERIOD_INTERVAL } from "./constants"
import { toDate } from "./toDate"
import { toITime } from "./toITime"

const START_HOUR = 10
const END_HOUR = 18

export const getPeriods = (): ITime[] => {
    const periods: ITime[] = [],
        date = toDate({hours: START_HOUR, minutes: 0}),
        startPeriod = START_HOUR  * 60 / PERIOD_INTERVAL,
        endPeriod = END_HOUR * 60 / PERIOD_INTERVAL - 1

    const pushPeriod = () => {
        periods.push(toITime(date))
    }

    pushPeriod()
    
    for (let i = startPeriod; i < endPeriod; i++) {
        date.setMinutes(date.getMinutes() + PERIOD_INTERVAL)
        pushPeriod()
    }

    return periods
}