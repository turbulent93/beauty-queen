import dayjs, { Dayjs } from "dayjs"
import { useEffect, useMemo } from "react"
import { CustomButton } from "../button/CustomButton"

const PERIOD_INTERVAL = 30
const format = "HH:mm"

const zeroficate = (value: number) => Number(value) < 10 ? `0${value}` : value

const toString = (value: Dayjs) => `${zeroficate(value.hour())}:${zeroficate(value.minute())}`
const toDayjs = (value: string) => {
    const [hour, minute] = value.split(":")
    
    return dayjs().hour(Number(hour)).minute(Number(minute))
}

export const getPeriods = (startAt: string, endAt: string, includeLast?: boolean) => {
    const periods: string[] = []
    const [startHour, startMinute] = startAt.split(":")
    const [endHour, endMinute] = endAt.split(":")
    let date = toDayjs(startAt)
    const diffInMinutes = dayjs()
        .hour(Number(endHour))
        .minute(Number(endMinute))
        .diff(dayjs()
            .hour(Number(startHour))
            .minute(Number(startMinute)), "minutes")
    const periodsCount = Math.ceil(diffInMinutes / PERIOD_INTERVAL)

    for (let i = 0; i < periodsCount; i++) {
        periods.push(toString(date))
        date = date.add(PERIOD_INTERVAL, "minute")
    }

    return periods
}

export type TimeSelectProps = {
    value: Dayjs,
    setValue: (value: Dayjs) => void,
    startTime?: string,
    endTime?: string,
    showTime?: boolean
}


export default function TimeSelect({value, setValue, startTime = "10:00", endTime = "18:00", showTime = false}: TimeSelectProps) {
    const items = useMemo(() => {
        return getPeriods(startTime, endTime)
    }, [startTime, endTime])

    const setTimeHander = (time: string) => {
        const [hour, minute] = time.split(":")

        setValue(value.set("hour", Number(hour)).set("minute", Number(minute)))
    }

    useEffect(() => {
        console.log(toString(value))
    }, [value])

    return (
        <div className="min-w-[400px] grid grid-cols-4 gap-3">
            {
                items.map(item => (
                    <CustomButton
                        color={toString(value) == item && showTime ? "red" : "gray"}
                        size="sm"
                        key={item}
                        onClick={() => setTimeHander(item)}
                    >
                        {item}
                    </CustomButton>
                ))
            }
        </div>
    )
}