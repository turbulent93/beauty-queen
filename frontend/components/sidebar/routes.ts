// import { dashboard_ROLE_NAME, MASTER_ROLE_NAME } from "@/utils/constants/roleNames";
import { IconType } from "react-icons";
import { 
    AiOutlineBook, 
    AiOutlineFileImage, 
    AiOutlinePercentage, 
    AiOutlineSchedule, 
    AiOutlineSearch, 
    AiOutlineSetting, 
    AiOutlineUser 
} from "react-icons/ai";
import { BsScissors } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { RiAdminLine } from "react-icons/ri";

export type RouteType = {
    title: string,
    href: string,
    Icon: IconType,
}

export const routes: RouteType[] = [
    {
        title: "Пользователи",
        href: "/dashboard/users",
        Icon: RiAdminLine,
        // permissions: [dashboard_ROLE_NAME]
    },
    {
        title: "Сотрудники",
        href: "/dashboard/employees",
        Icon: AiOutlineUser,
        // permissions: [dashboard_ROLE_NAME]
    },
    {
        title: "Расписание",
        href: "/dashboard/schedules",
        Icon: AiOutlineSchedule,
        // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    },
    // {
    //     title: "Промо",
    //     href: "/dashboard/promo",
    //     Icon: AiOutlinePercentage,
    //     // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    // },
    {
        title: "Услуги",
        href: "/dashboard/services",
        Icon: FaCogs,
        // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Специализации",
        href: "/dashboard/specializations",
        Icon: BsScissors,
        // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Записи",
        href: "/dashboard/appointments",
        Icon: AiOutlineBook,
        // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    },
    // {
    //     title: "Статистика",
    //     href: "/dashboard/statistics",
    //     Icon: ImStatsBars,
    //     // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    // },
    // {
    //     title: "Галерея",
    //     href: "/dashboard/gallery",
    //     Icon: AiOutlineFileImage,
    //     // permissions: [dashboard_ROLE_NAME, MASTER_ROLE_NAME]
    // },
    // {
    //     title: "Настройки",
    //     href: "/dashboard/settings",
    //     Icon: AiOutlineSetting,
    //     // permissions: [dashboard_ROLE_NAME]
    // },
    // {
    //     title: "Мета",
    //     href: "/dashboard/meta",
    //     Icon: AiOutlineSearch,
    //     // permissions: [dashboard_ROLE_NAME]
    // }
]