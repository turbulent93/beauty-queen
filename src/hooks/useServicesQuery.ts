import { catchError } from "@/api/api.handler"
import { IOption } from "@/interfaces/option.interface"
import { ServiceService } from "@/services/service/service.service"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useToast } from "./useToast"

export const useServicesQuery = (search?: string) => {
    const {data, isLoading, isError} = useQuery(
        ["get services", search],
        () => ServiceService.get(search),
        {
            select: ({data}): IOption[] => data?.map(s => ({value: s.id, label: s.name})),
            onError: (error: AxiosError) => useToast(catchError(error))
        }
    )

    return {data, isLoading, isError}
}