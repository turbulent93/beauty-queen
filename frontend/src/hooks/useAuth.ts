import { IAuthResponseDto } from "@/services/auth/auth.interface"
import { AuthService } from "@/services/auth/auth.service"
import { useQuery, useQueryClient } from "react-query"
import { removeTokens } from "@/api/api.handler"

export const useAuth = () => {
    const queryClient = useQueryClient()
    const {data, isLoading, isError} = useQuery(["check auth"], () => AuthService.checkAuth(), {
        select: (data) => data?.data
    })

    const logout = () => {
        queryClient.setQueryData(["check auth"], undefined)
        removeTokens()
    }

    const login = (dto: IAuthResponseDto) => {
        // queryClient.setQueryData(["check auth"], dto)
        queryClient.invalidateQueries(["check auth"])
    }

    return {
        ...data,
        isLoading,
        isError,
        logout,
        login
    }
}