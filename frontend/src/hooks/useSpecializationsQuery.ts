import { IOption } from "@/interfaces/option.interface"
import { SpecService } from "@/services/spec/spec.service"
import { useQuery } from "react-query"

export const useSpecializationsQuery = (search?: string) => {
    const {data, isLoading, isError} = useQuery(
        ["get specs", search], 
        () => SpecService.get(search),
        {
            select: ({data}): IOption[] => data?.map(s => ({value: s.id, label: s.name})),
        }
    )

    return {data, isLoading, isError}
}