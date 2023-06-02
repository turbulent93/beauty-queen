import { Grid } from "@/components/Grid";
import { useAppsQuery } from "@/hooks/useAppsQuery";
import { ITime } from "@/interfaces/calendar.interface";
import { setEndAt, setStartAt } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Error } from "@/ui/Error";
import { comparePeriods } from "@/utils/calendar/timepicker/comparePeriods";
import { getPeriods } from "@/utils/calendar/timepicker/getPeriods";
import { parsePeriod } from "@/utils/calendar/timepicker/parsePeriod";
import { toDate } from "@/utils/calendar/timepicker/toDate";
import { toITime } from "@/utils/calendar/timepicker/toITime";
import { toPeriod } from "@/utils/calendar/timepicker/toPeriod";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

const getIntervalError = (p: ITime) => {
    return `Интервал ${toPeriod(p)} занят, выберите другой`
}

export const TimePicker: FC = () => {
    const app = useAppSelector(store => store.appointment)
    const dispatch = useAppDispatch()

    const [periods, setPeriods] = useState<ITime[]>(getPeriods())
    const [error, setError] = useState<string | false>(false)

    const {data: apps} = useAppsQuery(app.appointment?.employeeId, app.schedule?.id)

    useEffect(() => {
        if(apps) {
            let periods = getPeriods()

            apps?.forEach(x => {
                const start = toDate(parsePeriod(x.startAt))
                const end = toDate(parsePeriod(x.endAt))

                periods = periods.map(p => {
                    return comparePeriods(p, start, end) ? {...p, isSelected: true} : p
                })
            })
            setPeriods(periods)
        }
    }, [apps])

    // useEffect(() => {
    //     console.log("employee id changed", app.appointment.employeeId)
    // }, [app.appointment.employeeId])

    // useEffect(() => {
    //     console.log("schedule changed", app.schedule)
    // }, [app.schedule])

    useEffect(() => {
        // console.log("schedule", app.schedule)
        if(!app.schedule && app.appointment.startAt && app.appointment.endAt) {
            dispatch(setStartAt(undefined))
            dispatch(setEndAt(undefined))
            setPeriods(getPeriods())
        }
        error && setError(false)
    }, [app.schedule])

    const handler = (x: ITime) => {
        if(!app.schedule) {
            setError("Сначала выберите день")
        } else if(app.duration) {
            const startAt = toDate(x)    
            const endAt = toDate({hours: x.hours, minutes: x.minutes + app.duration})
            const lastPeriod = periods[periods.length - 1]

            if(endAt > toDate(lastPeriod)) {
                setError("Время интервала превышает рабочее")
                return
            }

            for (let i = 0; i < periods.length; i++) {
                if(periods[i].isSelected && comparePeriods(periods[i], startAt, endAt)) {
                    setError(getIntervalError(periods[i]))
                    return
                }
            }

            error && setError(false)
            dispatch(setStartAt(toPeriod(toITime(startAt))))
            dispatch(setEndAt(toPeriod(toITime(endAt))))
        }
    }

    const isNotAllowed = (x: ITime) => {
        if(app.schedule && app.appointment.startAt && app.appointment.endAt) 
            return comparePeriods(
                x, 
                toDate(parsePeriod(app.appointment.startAt)), 
                toDate(parsePeriod(app.appointment.endAt))
            )
        return false
    }

    return (
        <div className="mt-6">
            <Grid>
                {
                    periods?.map(x => (
                        <div 
                            className={
                                clsx("rounded-sm p-2 text-center select-none cursor-pointer", 
                                    isNotAllowed(x) ? 
                                        "bg-red-500 text-white" : 
                                        x.isSelected ? "bg-slate-500 text-white" : 
                                            "bg-slate-300 text-black"
                                )}
                            onClick={() => handler(x)}
                            key={toPeriod(x)}>
                            {toPeriod(x)}
                        </div>
                    ))
                }
            </Grid>
            {
                error && <Error className="mt-8" message={error}/>
            }
        </div>
    )
}