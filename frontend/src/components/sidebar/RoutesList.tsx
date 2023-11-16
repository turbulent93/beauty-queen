import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/providers/SidebarProvider";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { routes } from "./routes";

export const RoutesList: FC = () => {
    const {isOpen, toggleIsOpen} = useSidebar()
    const {pathname} = useRouter()
    const ref = useRef<HTMLAnchorElement>(null)

    const {user} = useAuth()

    useEffect(() => {
        ref.current?.scrollIntoView({block: "end"})
    }, [])

    return (
        <div className="flex flex-col w-full duration-500 h-[calc(100vh-56px-80px)] overflow-y-auto scrollbar-hidden">
            {
                routes
                .filter(route => user && route.permissions.includes(user?.role.name))
                .map(route => (
                    <Link 
                        ref={pathname.includes(route.href) ? ref : undefined}
                        href={route.href} 
                        key={route.href} 
                        className={clsx("flex gap-3 py-4 px-7 items-center", pathname.includes(route.href) && "bg-red-400")}
                        onClick={() => isOpen && toggleIsOpen()}
                    >
                        <div>
                            <route.Icon size={24}/>
                        </div>
                        <div className={clsx("text-[16px]", isOpen ? "block" : "sm:hidden")}>
                            {
                                route.title
                            }
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}