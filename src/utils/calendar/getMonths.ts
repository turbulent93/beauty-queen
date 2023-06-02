import { IMonth } from "@/interfaces/calendar.interface"

const months = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь']

export const getMonths = (selectedYear: number): IMonth[] => {
    const curDate = new Date()
    const curMonths =  months.map((x, i) => ({name: x, number: i}))

    return curDate.getFullYear() == selectedYear ? 
        curMonths.slice(curDate.getMonth()) :
        curMonths
}