import { SettingsService } from "@/services/settings/settings.service"
import { useQuery } from "react-query"

export const useSettings = () => {
    const {data, isLoading, isError} = useQuery(["get settings"], () => SettingsService.get(), {
        select: (data) => data?.data
    })

    return {settings: data, isLoading, isError}
}