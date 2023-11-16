import { IMonth } from "@/interfaces/calendar.interface"
import moment from "moment"

const months = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь']

export const getMonths = (selectedYear?: number, startDate?: string, endDate?: string): IMonth[] => {
    const curYear = new Date().getFullYear()
    const start = moment(startDate, "YYYY-MM-DD")
    const end = moment(endDate, "YYYY-MM-DD")

    let curMonths = months.map((x, i) => ({name: x, number: i}))
    
    if(start && selectedYear == start.year()) {
        curMonths = curMonths.filter(m => m.number >= start.month())
    }

    if(end && selectedYear == end.year()) {
        curMonths = curMonths.filter(m => m.number <= end.month())
    }

    return curMonths
}

export const numberToMonth = (number: number): IMonth => {
    return {
        number,
        name: months[number]
    }
}