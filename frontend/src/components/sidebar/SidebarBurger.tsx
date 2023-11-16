import { useSidebar } from "@/providers/SidebarProvider";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const SidebarBurger: FC = () => {
    const {toggleIsOpen} = useSidebar()

    return (
        <div className="block sm:hidden ml-auto" onClick={() => toggleIsOpen()}>
            <AiOutlineClose size={32}/>
        </div>
    )
}