import dayjs, { Dayjs } from "dayjs"
import { useEffect, useMemo, useState } from "react";
import Dates from "./Dates";
import Months from "./Months";
import Years from "./Years";
import TimeSelect from "../timeSelect/TimeSelect";

export type CurrentProps = {
    value: Dayjs,
    setValue: (value: Dayjs) => void
}

type AppointerProps = {
    value: string,
    setValue: (value: string) => void
    startDate?: string,
    endDate?: string
}

const format = "YYYY-MM-DD"

const toDayjs = (value?: string) => dayjs(value, format)
const toString = (value: Dayjs) => value.format(format)

export default function Appointer({value, setValue, startDate, endDate}: AppointerProps) {
    const [current, setCurrent] = useState(toDayjs(value))
    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const startDateDayjs = toDayjs(startDate);
    const endDateDayjs = toDayjs(endDate);

    const setValueHandler = (value: Dayjs) => {
        setValue(toString(value))
        setCurrent(value)

        if(!showDate) setShowDate(true)
        if(showTime) setShowTime(false)
    }

    const setYearHandler = (value: Dayjs) => {
        setCurrent(value)

        if(showDate) setShowDate(false)
    }

    const setMonthHandler = (value: Dayjs) => {
        setCurrent(value)

        if(showDate) setShowDate(false)
    }

    const setTimeHandler = (value: Dayjs) => {
        setCurrent(value)

        if(showTime) setShowTime(false)
    }

	return (
        <div className="space-y-4">
            appointer
            <Years
                value={current}
                setValue={setYearHandler}
                startDate={startDateDayjs}
                endDate={endDateDayjs}
            />
            <Months
                value={current}
                setValue={setMonthHandler}
                startDate={startDateDayjs}
                endDate={endDateDayjs}
            />
            <Dates 
                value={current}
                setValue={setValueHandler}
                showDate={showDate}
                startDate={startDateDayjs}
                endDate={endDateDayjs}
            />
            <TimeSelect
                value={current}
                setValue={setTimeHandler}
                showTime={showTime}             
            />
        </div>
    )
}