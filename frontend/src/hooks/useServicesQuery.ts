import { IOption } from "@/interfaces/option.interface"
import { ServiceService } from "@/services/service/service.service"
import { useQuery } from "react-query"

export const useServicesQuery = (search?: string) => {
    const {data, isLoading, isError} = useQuery(
        ["get services", search],
        () => ServiceService.get(search),
        {
            select: ({data}): IOption[] => data?.map(s => ({value: s.id, label: s.name})),
        }
    )

    return {data, isLoading, isError}
}