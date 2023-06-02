import { IDate } from "@/interfaces/calendar.interface"
import { range } from "../range"
import { getLastDateOfMonth } from "./getLastDayOfMonth"


export const getDates = (selectedYear: number, selectedMonth: number) => {
    const currentDate = new Date(),
        lastDate = getLastDateOfMonth(selectedYear, selectedMonth),
        curMonth = currentDate.getMonth(),
        firstDate = curMonth == selectedMonth ? currentDate.getDate() : 1,
        newDates: IDate[] = range(firstDate, lastDate).map(x => ({number: x}))

    // console.log(curMonth, selectedMonth, curMonth == selectedMonth)

    return newDates
}