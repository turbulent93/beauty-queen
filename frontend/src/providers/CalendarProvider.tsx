import { ICalendarControlProps } from "@/components/calendar/Calendar";
import { useAddScheduleMutation } from "@/hooks/calendar/useAddScheduleMutation";
import { useSettings } from "@/hooks/useSettings";
import { IDate, IMonth } from "@/interfaces/calendar.interface";
import { createContext, FC, PropsWithChildren, useContext, useState, useEffect } from "react";

type CalendarType = {
    selectedYear?: number
    setSelectedYear: (value: number) => void
    selectedMonth?: IMonth
    setSelectedMonth: (value?: IMonth) => void
    selectedDate?: IDate
    setSelectedDate: (value: IDate) => void
    scheduleTime?: ScheduleTime
    setScheduleTime: (value: ScheduleTime) => void
    error?: string

    showTimeEditModal: boolean, 
    toggleShowTimeEditModal: () => void
} & ICalendarControlProps

type ScheduleTime = {
    scheduleStartAt?: string
    scheduleEndAt?: string
}

const CalendarContext = createContext<CalendarType>({} as CalendarType)

type CalendarProviderProps = {
    children: React.ReactNode
} & ICalendarControlProps

export const CalendarProvider: FC<PropsWithChildren<CalendarProviderProps>> = (
    {children, value, onChange, changeMode, employeeId, startDate, endDate, open}
) => {
    const [selectedYear, setSelectedYear] = useState<number>()
    const [selectedMonth, setSelectedMonth] = useState<IMonth>()
    const [selectedDate, setSelectedDate] = useState<IDate | undefined>()
    const [scheduleTime, setScheduleTime] = useState<ScheduleTime>()
    const [error, setError] = useState<string>()

    const [showTimeEditModal, setShowTimeEditModal] = useState(false) 

    const {mutate: addSchedule} = useAddScheduleMutation(selectedYear, selectedMonth?.number, employeeId)

    const {settings} = useSettings()

    const setDateHandler = (dateCell: IDate) => {
        if(changeMode == "app" && onChange) {
            if(dateCell.scheduleId) {
                if(value?.date == dateCell.date) {
                    onChange(undefined)
                } else {
                    onChange({
                        date: dateCell.date,
                        scheduleId: dateCell.scheduleId        
                    })
                    setScheduleTime({
                        scheduleStartAt: dateCell.startAt,
                        scheduleEndAt: dateCell.endAt
                    })
                }

                if(error) setError(undefined)
            } else {
                setError("Мастер не работает в этот день")
                onChange(undefined)
            }

            return
        }

        if(changeMode == "select" && onChange) {
            onChange({
                date: dateCell.date,
                scheduleId: dateCell.scheduleId
            })
            
            return
        }

        if(changeMode == "change" && dateCell.scheduleId && onChange) {
            onChange({
                date: dateCell.date,
                endAt: dateCell.endAt,
                startAt: dateCell.startAt,
                scheduleId: dateCell.scheduleId
            })
            setShowTimeEditModal(!showTimeEditModal)
        } else if(changeMode == "change" && employeeId) {
            addSchedule({
                date: dateCell.date,
                startAt: settings?.defaultStartWorkTime,
                endAt: settings?.defaultEndWorkTime,
                employeeId
            })
        }
    }

    useEffect(() => {
        if(selectedDate) {
            setSelectedDate(undefined)
        }
    }, [selectedYear, selectedMonth])

    return (
        <CalendarContext.Provider value={{
            selectedYear,
            setSelectedYear,
            selectedMonth,
            setSelectedMonth,
            selectedDate,
            setSelectedDate: setDateHandler,
            scheduleTime,
            setScheduleTime,
            error,

            showTimeEditModal,
            toggleShowTimeEditModal: () => setShowTimeEditModal(!showTimeEditModal),

            employeeId,
            startDate,
            endDate,
            value,
            onChange,
            open
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalendar = () => useContext(CalendarContext)