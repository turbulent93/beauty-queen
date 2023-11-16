import { FC } from "react";
import { YearPicker } from "./YearPicker";
import { MonthPicker } from "./MonthPicker";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { Days } from "./Days";
import { CalendarProvider } from "@/providers/CalendarProvider";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/ui/Button";
import Link from "next/link";
import { TimeEditModal } from "./TimeEditModal";

export interface ICalendarValue {
    date?: string
    startAt?: string
    endAt?: string
    scheduleId?: number
}

type CalendarProps = {
} & ICalendarControlProps

export interface ICalendarControlProps {
    value?: ICalendarValue
    onChange?: (value?: ICalendarValue) => void
    changeMode?: CalendarModeType
    employeeId?: number
    startDate?: string
    endDate?: string
    open?: boolean
    duration?: number
}

export type CalendarModeType = "select" | "change" | "app" 

export const Calendar: FC<CalendarProps> = ({
    employeeId, 
    changeMode, 
    value, 
    onChange, 
    startDate, 
    endDate, 
    open, 
    duration
}) => {
    const {user} = useAuth()

    return (
        <CalendarProvider 
            value={value} 
            onChange={onChange} 
            changeMode={changeMode} 
            employeeId={employeeId}
            startDate={startDate}
            endDate={endDate}
            open={open}
        >
            <div className={clsx("select-none max-w-[800px] mx-auto px-4")}>
                {
                    changeMode == "change" && user && (
                        <Button className="w-full">
                            <Link href={{pathname: "/admin/schedules/fill", query: {id: employeeId}}}>
                                Заполнить расписание
                            </Link>
                        </Button>
                    )
                }
                <YearPicker />
                <MonthPicker />
                <div className="pb-1 scrollbar scrollbar-red overflow-x-auto">
                    <Days />
                    <DatePicker />
                </div>
                {
                    changeMode == "app" && <TimePicker duration={duration}/>
                }
            </div>
            {
                changeMode == "change" && user && <TimeEditModal />
            }
        </CalendarProvider>
    )
}