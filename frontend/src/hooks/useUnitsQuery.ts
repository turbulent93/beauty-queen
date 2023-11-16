import { IOption } from "@/interfaces/option.interface"
import { UnitService } from "@/services/unit/unit.service"
import { useQuery } from "react-query"

export const useUnitsQuery = () => {
    const {data, isLoading, isError} = useQuery(["get units"], () => UnitService.get(), {
        select: ({data}): IOption[] => data.map((unit) => ({value: unit.id, label: unit.name}))
    })

    return {data, isLoading, isError}
}