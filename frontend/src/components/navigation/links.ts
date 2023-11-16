import { IconType } from "react-icons/lib"
import { BsShieldCheck } from "react-icons/bs";
import { getTokens } from "@/api/api.handler";
import { getLocalStorageAppointments } from "@/utils/appointments/getLocalStorageAppointments";

export interface INavItem {
    path: string
    name?: string
    Icon?: IconType
    isVisibleHandler?: () => boolean
}

export const links: INavItem[] = [
    {
        path: "/gallery",
        name: "Галерея"
    },
    {
        path: "/employees",
        name: "Мастера"
    },
    {
        path: "/price-list",
        name: "Прайс-лист"
    },
    {
        path: "/my-appointments",
        name: "Мои записи",
        isVisibleHandler: () => !!(getLocalStorageAppointments()?.length > 0)
    },
    {
        path: "/admin/employees",
        Icon: BsShieldCheck,
        isVisibleHandler: () => !!getTokens()
    }
]