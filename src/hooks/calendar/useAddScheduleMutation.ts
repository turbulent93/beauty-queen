import { IScheduleDto } from "@/services/schedule/schedule.interface"
import { ScheduleService } from "@/services/schedule/schedule.service"
import { useMutation, useQueryClient } from "react-query"

export const useAddScheduleMutation = (year: number, month: number, employeeId?: number) => {
    const queryClient = useQueryClient()
    const mutation = useMutation((schedule: IScheduleDto) => {
            return ScheduleService.post(schedule)
        }, {
            onSuccess: () => queryClient.invalidateQueries(["get schedules", employeeId, year, month])
        })

    return mutation
}