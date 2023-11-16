import { IOption } from "@/interfaces/option.interface"
import { RoleService } from "@/services/roles/roles.service"
import { useQuery } from "react-query"

export const useRolesQuery = (search?: string) => {
    const {isLoading, isError, data} = useQuery(
        ["search roles", search],
        () => RoleService.get(search),
        {
            select: ({data}): IOption[] => data?.map(x => ({value: x.id, label: x.name}))
        })

    return {isLoading, isError, data}
}