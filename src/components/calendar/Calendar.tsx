import { FC } from "react";
import { useState, useEffect } from "react"
import { CalendarModeType, IMonth } from "@/interfaces/calendar.interface";
import { YearPicker } from "./YearPicker";
import { MonthPicker } from "./MonthPicker";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { useAppSelector } from "@/store/hooks";

type CalendarProps = {
    employeeId?: number
    className?: string
    mode?: CalendarModeType
}

const getSelectedYear = (date?: string) => {
    return date ? new Date(date).getFullYear() : new Date().getFullYear()
}

export const Calendar: FC<CalendarProps> = (
    {className, mode = "user", employeeId}
) => {
    const schedule = useAppSelector(store => store.appointment.schedule) 
    const [selectedYear, setSelectedYear] = useState(getSelectedYear(schedule?.date))
    const [selectedMonth, setSelectedMonth] = useState<IMonth>()

    return (
        <div className={className}>
            <YearPicker 
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear} />
            <MonthPicker
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear} />
            <DatePicker 
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                mode={mode} 
                employeeId={employeeId}/>
            {
                mode == "user" && <TimePicker />
            }
        </div>
    )
}