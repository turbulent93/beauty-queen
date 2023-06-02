import { IMonth } from "@/interfaces/calendar.interface";
import { useAppSelector } from "@/store/hooks";
import { getMonths } from "@/utils/calendar/getMonths";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

interface MonthPickerProps {
    selectedMonth?: IMonth
    setSelectedMonth: (value: IMonth | undefined) => void
    selectedYear: number
}

export const MonthPicker: FC<MonthPickerProps> = ({selectedMonth, setSelectedMonth, selectedYear}) => {
    const [currentMonths, setCurrentMonths] = useState<IMonth[]>(getMonths(selectedYear))
    const schedule = useAppSelector(store => store.appointment.schedule)

    const getSelectedMonth = (selectedYear: number) => {
        const months = getMonths(selectedYear)
    
        if(schedule?.date) {
            const number = new Date(schedule?.date).getMonth(),
                defaultMonth = months.find(x => x.number == number)
    
            return defaultMonth ? defaultMonth : months[0]
        }
        return months[0]
    } 

    useEffect(() => {
        // console.log("year use effect", selectedYear)
        const months = getMonths(selectedYear)
        setCurrentMonths(months)
        const month = getSelectedMonth(selectedYear)
        // console.log("selected month changed", month)
        setSelectedMonth(month)
    }, [selectedYear])

    return (
        <div className="flex mb-6 overflow-x-auto gap-1 scrollbar scrollbar-red pb-1">
            {
                currentMonths?.map(x => (
                    <div 
                        className={clsx("bg-slate-300 py-4 px-6 cursor-pointer", {
                            "bg-slate-500 text-white": selectedMonth?.name == x.name
                        })}
                        key={x.number}
                        onClick={() => {
                            setSelectedMonth(x)
                        }}>
                        {x.name}
                    </div>
                ))
            }
        </div>
    )
}