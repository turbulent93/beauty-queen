import { catchError } from "@/api/api.handler"
import { IOption } from "@/interfaces/option.interface"
import { EmployeeService } from "@/services/employee/employee.service"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useToast } from "./useToast"

export const useEmployeeQuery = () => {
    const {isLoading, isError, data} = useQuery(["get employees"], 
    () => EmployeeService.get(), {
        select: (data): IOption[] => data?.data.map(x => ({value: x.id, label: x.name + " " + x.surname})),
        onError: (error: AxiosError) => useToast(catchError(error))
    })

    return {isLoading, isError, data}
}