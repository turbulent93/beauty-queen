import { catchError } from "@/api/api.handler"
import { IOption } from "@/interfaces/option.interface"
import { UserService } from "@/services/user/user.service"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useToast } from "./useToast"

export const useUsersQuery = (search?: string) => {
    const {isLoading, isError, data} = useQuery(["search users", search], () => UserService.search(search), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        select: (data): IOption[] => data?.data.map(x => ({label: x.login, value: x.id}))
    })

    return {isLoading, isError, data}
}