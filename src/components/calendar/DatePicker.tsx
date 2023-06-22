import { Grid } from "@/components/Grid";
import { useAddScheduleMutation } from "@/hooks/calendar/useAddScheduleMutation";
import { useRemoveScheduleMutation } from "@/hooks/calendar/useRemoveScheduleMutation";
import { IDate, IMonth } from "@/interfaces/calendar.interface";
import { ScheduleService } from "@/services/schedule/schedule.service";
import { setSchedule, setScheduleId } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDates } from "@/utils/calendar/getDates";
import { dateOnlyConverter } from "@/utils/dateOnlyConverter";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Error } from "@/ui/Error";
import { ModeType } from "@/interfaces/mode.interface";

interface DatePickerProps {
    selectedMonth?: IMonth
    selectedYear: number
    mode: ModeType
    employeeId?: number
}

export const DatePicker: FC<DatePickerProps> = (
    {selectedYear, selectedMonth, mode, employeeId}
) => {
    const app = useAppSelector(store => store.appointment)
    const dispatch = useAppDispatch()

    const employee = mode == "user" ? app.appointment.employeeId : employeeId

    const [selectedDate, setSelectedDate] = useState<number | undefined>()
    const [currentDates, setCurrentDates] = useState<IDate[]>(getDates(selectedYear, selectedMonth?.number!))
    const [error, setError] = useState<string | undefined>()
    const [prevMonth, setPrevMonth] = useState<IMonth>()

    const {data: schedules} = useQuery(
        ["get schedules", employee, selectedYear, selectedMonth?.number], 
        () => ScheduleService.get(
            employee, 
            selectedYear, 
            selectedMonth?.number! + 1
        ), 
        {
            select: ({data}) => data,
            enabled: !!selectedMonth && !!employee,
            onSuccess: (data) => {
                // console.log("success dates")
                setCurrentDates(getDates(selectedYear, selectedMonth?.number!).map(x => 
                    !!data?.find(s => new Date(s.date).getDate() == x.number) ? {...x, isSelected: true} : x
                ))
            }
        })

        // console.log(employee)

    // useEffect(() => {
    //     // console.log("date use effect")
    //     console.log(selectedDate)
    // }, [selectedDate])

    useEffect(() => {
        // console.log("month changed", prevMonth, selectedMonth)
        if(prevMonth && prevMonth != selectedMonth) {
            // console.log("month use effect", prevMonth, selectedMonth)
            setSelectedDate(undefined)
            dispatch(setSchedule(undefined))
        } else if(app.schedule?.date && selectedMonth) {
            // console.log("date use effect", selectedMonth)
            setSelectedDate(new Date(app.schedule.date).getDate())
            setPrevMonth(selectedMonth)
            // console.log("prev month", prevMonth)
        }
        error && setError(undefined)
    }, [selectedMonth])


    // useEffect(() => {
    //     console.log("dates changed", currentDates)
    // }, [currentDates])
            
    const addMutation = useAddScheduleMutation(selectedYear, selectedMonth?.number!, employeeId)
    const removeMutation = useRemoveScheduleMutation(selectedYear, selectedMonth?.number!, employeeId)
            
    const findSchedule = (x: IDate) => {
        return schedules?.find(s => new Date(s.date).getDate() == x.number)
    }

    const handler = (date: IDate) => {
        if(mode == "master") {
            return
        }

        const schedule = findSchedule(date)

        if(mode == "user" && schedule) {
            dispatch(setSchedule(schedule))
            dispatch(setScheduleId(schedule.id))
            setSelectedDate(date.number)
            error && setError(undefined)
        } else if(mode == "user") {
            setError("Мастер не работает в этот день")
        }
        
        if(mode == "admin" && schedule) {
            removeMutation.mutate(schedule.id)
        } else if(mode == "admin" && selectedMonth && employeeId) {
            addMutation.mutate({
                date: dateOnlyConverter(selectedYear, selectedMonth.number, date.number),
                employeeId
            })
        }
    }

    return (
        <>
            <Grid>
                {
                    currentDates?.map(dateCell => (
                        <div 
                            key={dateCell.number}
                            className={clsx(
                                "rounded-sm p-2 text-center select-none cursor-pointer",
                                mode == "user" && 
                                    selectedDate == dateCell.number ?
                                    "bg-red-500 text-white" :
                                        dateCell.isSelected ? 
                                            "bg-slate-500 text-white" : 
                                            "bg-slate-300 text-black"
                            )}
                            onClick={() => handler(dateCell)}>
                            {dateCell.number}
                        </div>
                    ))
                }
            </Grid>
            {
                error && <Error message={error} />
            }
        </>
    )
}