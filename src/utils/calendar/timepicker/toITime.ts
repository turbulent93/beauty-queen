import { ITime } from "@/interfaces/calendar.interface"

export const toITime = (date: Date): ITime => {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes()
    }
}