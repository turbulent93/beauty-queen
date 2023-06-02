import { AppService } from "@/services/app/app.service"
import { useQuery } from "react-query"

export const useAppsQuery = (employeeId?: number, scheduleId?: number) => {
    const {data, isLoading, isError} = useQuery(
        ["get apps", employeeId, scheduleId], 
        () => AppService.get(employeeId!, scheduleId!), {
        select: ({data}) => data,
        enabled: !!employeeId && !!scheduleId
    })

    return {data, isLoading, isError}
}