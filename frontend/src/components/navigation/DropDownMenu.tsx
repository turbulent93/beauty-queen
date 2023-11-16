import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { links } from "./links";
import { NavLink } from "./NavLink";

interface DropDownMenuProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export const DropDownMenu: FC<DropDownMenuProps> = ({open, setOpen}) => {
    if(!open) {
        return null
    }

    return (
        <div 
            className="bg-slate-500 rounded-sm absolute right-4 top-[85px] flex flex-col gap-4 px-4 py-2 z-20"
            tabIndex={0}
            onClick={() => setOpen(!open)}
        >
            {
                links.map((item, i) => (
                    <NavLink item={item} key={i} />
                ))
            }
        </div>
    )
}