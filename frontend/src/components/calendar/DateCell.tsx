import { IDate } from "@/interfaces/calendar.interface";
import { useCalendar } from "@/providers/CalendarProvider";
import clsx from "clsx";
import moment from "moment";
import { FC } from "react";

interface IDateCellProps {
    dateCell: IDate
}

export const DateCell: FC<IDateCellProps> = ({dateCell}) => {
    const {selectedMonth, selectedYear, value, setSelectedDate} = useCalendar()

    return (
        <div 
            style={{
                gridColumnStart: moment(dateCell.date).date() == 1 ? 
                    moment({year: selectedYear, month: selectedMonth?.number}).startOf("month").weekday() : 
                    undefined
            }}
            className={clsx(
                "rounded-sm p-2 text-center select-none cursor-pointer group relative",
                dateCell.date == value?.date ?
                    "bg-red-400 text-white" :
                        dateCell?.scheduleId ? 
                            "bg-slate-500 text-white" : 
                            "bg-slate-300 text-black"
            )}
            onClick={() => setSelectedDate(dateCell)}
        >
            {
                dateCell.number
            }
        </div>
    )
}