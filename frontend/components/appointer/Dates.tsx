import { Dayjs } from "dayjs"
import { CustomButton } from "../button/CustomButton"
import { useEffect, useMemo, useState } from "react"

type ValueProps = {
    value: Dayjs,
    setValue: (value: Dayjs) => void
    showDate: boolean,
    startDate?: Dayjs,
    endDate?: Dayjs
}

const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

const getDates = (start: number, stop: number) => {
    return Array.from({ length: stop - start + 1 }, (value, index) => start + index)   
}

export default function Dates({value, setValue, showDate, startDate, endDate}: ValueProps) {
    const dates = useMemo(() => {
        let d = getDates(1, value.daysInMonth())

        if(startDate && value.year() === startDate.year() && value.month() === startDate.month()) {
            d = d.filter(i => i >= startDate.date())
        }

        if(endDate && value.year() === endDate.year() && value.month() === endDate.month()) {
            d = d.filter(i => i <= endDate.date())
        }

        return d
    }, [value, startDate, endDate])

    return(
        <>
            <div className="min-w-[400px] grid grid-cols-7 gap-3">
                {
                    days.map(day => (
                        <div key={day} className="p-2 text-center cursor-pointer border-b border-default-100 hover:border-default-200 transition-background duration-300">
                            {day}
                        </div>
                    ))
                }
            </div>
            <div className="min-w-[400px] grid grid-cols-7 gap-3">
                {
                    dates.map((day, i) => (
                        <CustomButton
                            color={value.date() == day && showDate ? "red" : "gray"}
                            size="sm"
                            key={day}
                            onClick={() => setValue(value.set("date", day))}
                            style={{gridColumn: i === 0 ? value.date(day).day() : undefined}}
                        >
                            {day}
                        </CustomButton>
                    ))
                }
            </div>
        </>
    )
}