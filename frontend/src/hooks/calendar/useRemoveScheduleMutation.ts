import { ScheduleService } from "@/services/schedule/schedule.service"
import { useMutation, useQueryClient } from "react-query"
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";

export const useRemoveScheduleMutation = (year?: number, month?: number, employeeId?: number) => {
    const queryClient = useQueryClient()
    return useMutation((id: number) => ScheduleService.delete(id), 
        {
            onSuccess: () => {
                useSuccessToast()
                return queryClient.invalidateQueries(["get schedules", employeeId, year, month])
            },
            onError: () => useErrorToast()
        })
}