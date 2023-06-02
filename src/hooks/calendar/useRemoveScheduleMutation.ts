import { ScheduleService } from "@/services/schedule/schedule.service"
import { useMutation, useQueryClient } from "react-query"

export const useRemoveScheduleMutation = (year: number, month: number, employeeId?: number) => {
    const queryClient = useQueryClient()
    return useMutation((id: number) => ScheduleService.delete(id), 
        {
            onSuccess: () => queryClient.invalidateQueries(["get schedules", employeeId, year, month])
        })
}