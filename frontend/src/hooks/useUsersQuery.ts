import { IOption } from "@/interfaces/option.interface"
import { UserService } from "@/services/user/user.service"
import { useQuery } from "react-query"

export const useUsersQuery = (search?: string, onlyNotEmployees?: boolean, excludedId?: number) => {
    const {isLoading, isError, data} = useQuery(["search users", search], () => UserService.get(search, onlyNotEmployees, excludedId), {
        select: (data): IOption[] => data?.data.map(x => ({label: x.login, value: x.id}))
    })

    return {isLoading, isError, data}
}