import { ITime } from "@/interfaces/calendar.interface"

export const toDate = (x: ITime) => {
    const date = new Date()

    date.setHours(x.hours)
    date.setMinutes(x.minutes)

    return date
}