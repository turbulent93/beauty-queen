import { ADMIN_ROLE_NAME, MASTER_ROLE_NAME } from "@/utils/constants/roleNames";
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

export const routes = [
    {
        title: "Пользователи",
        href: "/admin/users",
        Icon: RiAdminLine,
        permissions: [ADMIN_ROLE_NAME]
    },
    {
        title: "Сотрудники",
        href: "/admin/employees",
        Icon: AiOutlineUser,
        permissions: [ADMIN_ROLE_NAME]
    },
    {
        title: "Расписание",
        href: "/admin/schedules",
        Icon: AiOutlineSchedule,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Промо",
        href: "/admin/promo",
        Icon: AiOutlinePercentage,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Услуги",
        href: "/admin/services",
        Icon: FaCogs,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Специализации",
        href: "/admin/specializations",
        Icon: BsScissors,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Записи",
        href: "/admin/appointments",
        Icon: AiOutlineBook,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Статистика",
        href: "/admin/statistics",
        Icon: ImStatsBars,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Галерея",
        href: "/admin/gallery",
        Icon: AiOutlineFileImage,
        permissions: [ADMIN_ROLE_NAME, MASTER_ROLE_NAME]
    },
    {
        title: "Настройки",
        href: "/admin/settings",
        Icon: AiOutlineSetting,
        permissions: [ADMIN_ROLE_NAME]
    },
    {
        title: "Мета",
        href: "/admin/meta",
        Icon: AiOutlineSearch,
        permissions: [ADMIN_ROLE_NAME]
    }
]