import { IDate } from "@/interfaces/calendar.interface"
import moment from "moment"

export const getDates = (year?: number, month?: number, startDate?: string, endDate?: string): IDate[] => {
    const start = moment(startDate, "YYYY-MM-DD")
    const end = moment(endDate, "YYYY-MM-DD")

    const lastDayOfCurrenMonth = moment({year, month}).endOf("month").date()

    const getDateNumbers = (firstDate: number, lastDate: number): IDate[] => {
        return Array.from(
            {length: lastDate - firstDate + 1},
            (_, i) => ({
                date: moment({year, month, day: firstDate + i}).format("YYYY-MM-DD"),
                number: firstDate + i
            }))
    }

    if(startDate && month == start.month()) {
        return getDateNumbers(start.day(), lastDayOfCurrenMonth)
    }

    if(endDate && month == end.month()) {
        return getDateNumbers(
            1,
            end.date()
        )
    }

    return getDateNumbers(1, lastDayOfCurrenMonth)    
}