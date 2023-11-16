import { useSidebar } from "@/providers/SidebarProvider";
import clsx from "clsx";
import { FC } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Logo } from "../Logo";
import { SidebarBurger } from "./SidebarBurger";

export const SidebarLogo: FC = () => {
    const {isOpen, toggleIsOpen} = useSidebar()

    return (
        <div className={clsx(
            "flex items-center h-20 w-full relative px-[18px]",
        )}>
            <Logo open={isOpen} />
            <SidebarBurger />
            <div 
                className={clsx(
                    "bg-slate-500 sm:bg-gray-300 cursor-pointer sm:text-black rounded-full -mr-6 p-4 sm:p-1.5 duration-500 absolute max-sm:top-1.5 -right-6 sm:right-3",
                    isOpen && "rotate-180"
                )} 
                onClick={() => toggleIsOpen()}
            >
                <BsChevronRight size={12}/>
            </div>
        </div>
    )
}