import { useSidebar } from "@/providers/SidebarProvider";
import clsx from "clsx";
import { FC } from "react";
import { Profile } from "./Profile";
import { RoutesList } from "./RoutesList";
import { SidebarLogo } from "./SidebarLogo";

interface SidebarBodyProps {

}

export const SidebarBody: FC<SidebarBodyProps> = () => {
    const {isOpen} = useSidebar()

    return (
        <div className={clsx(
            "fixed z-50 duration-500 flex flex-col justify-between h-screen bg-slate-500 text-white max-sm:w-full w-[80px]", 
            isOpen ? "max-sm:translate-x-0 sm:w-[280px]" : "max-sm:-translate-x-full"
        )}>
            <div>
                <SidebarLogo />
                <RoutesList />
            </div>
            <Profile /> 
        </div>
    )
}