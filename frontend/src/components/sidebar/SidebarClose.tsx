import { useSidebar } from "@/providers/SidebarProvider";
import clsx from "clsx";
import { FC } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export const SidebarClose: FC = () => {
    const {isOpen, toggleIsOpen} = useSidebar()

    return (
        <div 
            className={clsx("absolute top-0 left-0 bg-gray-300 duration-500 p-2 rounded-full max-sm:hidden", isOpen && "rotate-180")}
            onClick={() => toggleIsOpen()}
        >
            <AiOutlineArrowRight size={18}/>
        </div>
    )
}