import { Grid } from "@/components/Grid";
import { ScheduleService } from "@/services/schedule/schedule.service";
import { getDates } from "@/utils/calendar/getDates";
import { FC } from "react";
import { useQuery } from "react-query";
import { useCalendar } from "@/providers/CalendarProvider";
import { DateCell } from "./DateCell";
import { Error } from "@/ui/Error";
import moment from "moment";

export const DatePicker: FC = () => {
    const {
        selectedYear, 
        selectedMonth, 
        error,
        employeeId,
        startDate,
        endDate
    } = useCalendar()

    const {data: schedules} = useQuery(
        ["get schedules", employeeId, selectedYear, selectedMonth?.number], 
        () => ScheduleService.get(
            employeeId, 
            selectedYear, 
            selectedMonth?.number! + 1
        ), 
        {
            enabled: !!selectedMonth && !!employeeId,
            select: (data) => {
                return getDates(
                        selectedYear,  
                        selectedMonth?.number, 
                        startDate,
                        endDate
                    ).map(dateCell => {
                        const schedule = data?.find(s => moment(s.date).format("YYYY-MM-DD") == dateCell.date)

                        if(schedule) {
                            return {endAt: schedule.endAt, startAt: schedule.startAt, date: dateCell.date, scheduleId: schedule.id, number: dateCell.number}
                        } else {
                            return dateCell
                        }
                    })
            },
            initialData: []
        })
        
    return (
        <>
            <Grid className="min-w-[400px]">
                {
                    schedules?.map((dateCell, i) => (
                        <DateCell 
                            dateCell={dateCell} 
                            key={dateCell.date} />
                    ))
                }
            </Grid>
            {
                error && <Error message={error}/>
            }
        </>
    )
}