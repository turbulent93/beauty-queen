import { IMonth } from "@/interfaces/calendar.interface";
import { useCalendar } from "@/providers/CalendarProvider";
import { getMonths, numberToMonth } from "@/utils/calendar/getMonths";
import clsx from "clsx";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";

export const MonthPicker: FC = () => {
    const {
        selectedMonth, 
        setSelectedMonth, 
        selectedYear, 
        startDate, 
        endDate,
        open,
        value
    } = useCalendar()
    const [currentMonths, setCurrentMonths] = useState<IMonth[]>()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const months = getMonths(
            selectedYear, 
            startDate,
            endDate
        )

        setCurrentMonths(months)

        const month = moment(value?.date, "YYYY-MM-DD").month()
        
        if(!selectedYear) return

        if(startDate) {
            setSelectedMonth(months[0])
        } else 
        if(endDate && months.length < 12) {
            setSelectedMonth(months[new Date().getMonth()])
        } else if(month) {
            setSelectedMonth(months[month])
        } else if(selectedYear == new Date().getFullYear()) {
            setSelectedMonth(months[new Date().getMonth()])
        } else {
            setSelectedMonth(months[0])
        }
    }, [selectedYear, startDate, endDate])

    useEffect(() => {
        if(open && value?.date) {
            const monthNumber = moment(value.date, "YYYY-MM-DD").month()

            setSelectedMonth(numberToMonth(monthNumber))
        }
        ref.current?.scrollIntoView({inline: "start", behavior: "smooth"})
    }, [open])

    useEffect(() => {
        ref.current?.scrollIntoView({inline: "start", behavior: "smooth"})
    }, [selectedMonth])

    return (
        <div className="flex mb-6 overflow-x-auto gap-3 scrollbar scrollbar-red pb-1 flex-grow-0">
            {
                currentMonths?.map(x => (
                    <div 
                        className={clsx("p-4 cursor-pointer text-center rounded-sm", 
                            selectedMonth?.name == x.name ? "bg-red-400 text-white" : "bg-slate-300"
                        )}
                        key={x.number}
                        onClick={() => setSelectedMonth(x)}
                        ref={selectedMonth?.name == x.name ? ref : undefined}
                    >
                        {x.name}
                    </div>
                ))
            }
        </div>
    )
}