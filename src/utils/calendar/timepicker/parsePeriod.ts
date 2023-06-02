import { ITime } from "@/interfaces/calendar.interface"

export const parsePeriod = (period: string): ITime => {
    const arr = period.split(":")

    return {hours: Number(arr[0]), minutes: Number(arr[1])}
}