import { Grid } from "@/components/Grid";
import { useAppsQuery } from "@/hooks/useAppsQuery";
import { ITime } from "@/interfaces/calendar.interface";
import { Error } from "@/ui/Error";
import { getPeriods } from "@/utils/calendar/timepicker/getPeriods";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import {useCalendar} from "@/providers/CalendarProvider"
import moment from "moment";
import { comparePeriods } from "@/utils/calendar/timepicker/comparePeriods";
import { PERIOD_INTERVAL } from "@/utils/calendar/timepicker/constants";

const getIntervalError = (p: ITime) => {
    return `Интервал ${p.time} занят, выберите другой`
}

interface ITimePickerProps {
    duration?: number
}

export const TimePicker: FC<ITimePickerProps> = ({duration}) => {
    const {
        employeeId,
        value,
        onChange,
        scheduleTime
    } = useCalendar()

    const [periods, setPeriods] = useState<ITime[]>()
    const [error, setError] = useState<string | false>(false)

    const {data: apps} = useAppsQuery(employeeId, value?.scheduleId)

    useEffect(() => {
        if(apps && scheduleTime) {
            let newPeriods = getPeriods(scheduleTime?.scheduleStartAt, scheduleTime.scheduleEndAt)

            apps?.forEach(x => {
                const start = moment(x.startAt, "HH:mm")
                const end = moment(x.endAt, "HH:mm")

                newPeriods = newPeriods.map(p => {
                    return comparePeriods(p, start, end) ? {time: p.time, isSelected: true} : p
                })
            })
            setPeriods(newPeriods)
        }
    }, [apps])

    const handler = (x: ITime) => {
        if(!periods) return

        if(!value?.date) {
            setError("Сначала выберите день")
        } else if(duration) {
            const startAt = moment(x.time, "HH:mm")    
            const endAt = moment(x.time, "HH:mm").add(duration, "minutes")
            const lastPeriod = periods[periods.length - 1]

            if(endAt.isAfter(moment(lastPeriod.time, "HH:mm").add(PERIOD_INTERVAL, "minutes"))) {
                setError("Время интервала превышает рабочее")
                onChange && onChange({
                    ...value,
                    startAt: undefined,
                    endAt: undefined
                })
                return
            }

            for (let i = 0; i < periods.length; i++) {
                if(periods[i].isSelected && comparePeriods(periods[i], startAt, endAt)) {
                    setError(getIntervalError(periods[i]))
                    return
                }
            }

            error && setError(false)
            onChange && onChange({
                ...value,
                startAt: startAt.format("HH:mm"),
                endAt: endAt.format("HH:mm")
            })
        }
    }

    const isNotAllowed = (x: ITime) => {
        if(value?.startAt && value?.endAt) {
            const startAt = moment(value?.startAt, "HH:mm")
            const endAt = moment(value?.endAt, "HH:mm")

            return comparePeriods(x, startAt, endAt)
        }
        return false
    }

    if(!value?.scheduleId) {
        return null
    }

    return (
        <div className="mt-6">
            <Grid className="max-[600px]:grid-cols-4">
                {
                    periods?.map(p => (
                        <div 
                            className={
                                clsx("rounded-sm p-2 text-center select-none cursor-pointer", 
                                    isNotAllowed(p) ? 
                                        "bg-red-400 text-white" : 
                                        p.isSelected ? "bg-slate-300" : 
                                            "bg-slate-500 text-white"
                                )}
                            onClick={() => handler(p)}
                            key={p.time}>
                            {p.time}
                        </div>
                    ))
                }
            </Grid>
            {
                error && <Error message={error}/>
            }
        </div>
    )
}