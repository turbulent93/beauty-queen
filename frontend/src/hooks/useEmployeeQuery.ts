import { IOption } from "@/interfaces/option.interface"
import { EmployeeService } from "@/services/employee/employee.service"
import { useQuery } from "react-query"

export const useEmployeeQuery = () => {
    const {isLoading, isError, data} = useQuery(["get employees"], 
    () => EmployeeService.get(), {
        select: (data): IOption[] => data?.data.map(x => ({value: x.id, label: x.name + " " + x.surname})),
    })

    return {isLoading, isError, data}
}