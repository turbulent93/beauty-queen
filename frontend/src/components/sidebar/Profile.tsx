import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/providers/SidebarProvider";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { GoSignOut } from "react-icons/go";
import { MdSettings } from "react-icons/md"

export const Profile: FC = () => {
    const {user, employee, logout} = useAuth()
    const {isOpen, toggleIsOpen} = useSidebar()

    return (
        <div className={clsx(
            "p-4 flex items-center gap-2 bg-slate-600 justify-center"
        )}>
            <span className={clsx("truncate", !isOpen && "hidden")}>
                {   
                    user?.login
                }
            </span>
            <span className={clsx("px-2 py-1 bg-red-400 rounded-full text-[14px]", !isOpen && "hidden")}>
                {
                    user?.role.name
                }
            </span>
            <Link 
                href={employee ? "/admin/profile/update-employee" : "/admin/profile/become-employee"}
                className={!isOpen ? "hidden" : undefined}
                onClick={() => toggleIsOpen()}
            >
                <div>
                    <MdSettings size={24}/>
                </div>
            </Link>
            <div 
                className={clsx("text-white cursor-pointer", isOpen && "ml-auto")} 
                onClick={() => logout()}
            >
                <GoSignOut size={24}/>
            </div>
        </div>
    )
}