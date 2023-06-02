import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { FaCrown, FaCogs } from "react-icons/fa"
import { ImStatsBars } from "react-icons/im"
import { AiOutlineBook, AiOutlineSchedule, AiOutlineUser, AiOutlineFileImage, AiOutlineLogout, AiOutlineArrowRight } from "react-icons/ai"
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleIsOpen } from "@/store/sidebar.slice";
import { BsScissors } from "react-icons/bs"

const routes = [
    {
        title: "Сотрудники",
        href: "/admin/employees",
        Icon: AiOutlineUser
    },
    {
        title: "Расписание",
        href: "/admin/schedules",
        Icon: AiOutlineSchedule
    },
    {
        title: "Услуги",
        href: "/admin/services",
        Icon: FaCogs
    },
    {
        title: "Специализации",
        href: "/admin/specializations",
        Icon: BsScissors
    },
    {
        title: "Записи",
        href: "/admin/appointments",
        Icon: AiOutlineBook
    },
    {
        title: "Статистика",
        href: "/admin/statistics",
        Icon: ImStatsBars
    },
    {
        title: "Галерея",
        href: "/admin/gallery",
        Icon: AiOutlineFileImage
    },
    {
        title: "Выйти",
        href: "/admin/auth",
        Icon: AiOutlineLogout
    }
]

export const Sidebar: FC<PropsWithChildren> = ({children}) => {
    const {pathname} = useRouter()
    const dispatch = useAppDispatch()
    const open = useAppSelector(store => store.sidebar.isOpen)

    const handler = () => {
        dispatch(toggleIsOpen())
    }

    return (
        <>
            <div className="flex h-screen top-0 z-10 fixed">
                <div className={clsx(
                    "bg-gray-600 py-4 relative duration-300 h-[4000px]",
                    {
                        "w-[300px]": open,
                        "w-[80px]": !open
                    }
                )}>
                    <Link href="/">
                        <div className="flex items-center cursor-pointer mb-2 p-3 gap-2">
                            <div>
                                <FaCrown color="white" size={30} />
                            </div>
                            <h1 className={clsx("text-white text-[20px]", {
                                "hidden": !open
                            })}>
                                Название
                            </h1>
                        </div>
                    </Link>
                    <div 
                        className={clsx("absolute -right-5 top-6 bg-gray-300 p-3 rounded-full cursor-pointer", {
                            "rotate-180": open
                        })}
                        onClick={() => handler()}>
                        <AiOutlineArrowRight/>
                    </div>
                    {routes.map(route => (
                        <Link href={route.href} 
                            key={route.title} 
                            className={clsx(
                                "flex gap-2 text-white items-center hover:bg-stone-700 p-4 rounded-sm cursor-pointer",
                                {
                                    "bg-red-400": pathname.includes(route.href) 
                                }
                            )}>
                            <div>
                                <route.Icon size={22}/>
                            </div> 
                            <span className={clsx(
                                "text-[16px]",
                                {
                                    "hidden": !open
                                })}>{route.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={clsx("duration-300", {
                        "ml-[80px]": !open,
                        "ml-[300px]": open
                    }
                )}>
                {children}
            </div>
        </>
    )
}