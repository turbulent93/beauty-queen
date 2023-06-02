import { catchError } from "@/api/api.handler"
import { IOption } from "@/interfaces/option.interface"
import { SpecService } from "@/services/spec/spec.service"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useToast } from "./useToast"

export const useSpecializationsQuery = (search?: string) => {
    const {data, isLoading, isError} = useQuery(
        ["get specs", search], 
        () => SpecService.get(search),
        {
            select: ({data}): IOption[] => data?.map(s => ({value: s.id, label: s.name})),
            onError: (error: AxiosError) => useToast(catchError(error))
        }
    )

    return {data, isLoading, isError}
}