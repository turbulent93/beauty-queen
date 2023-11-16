import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { FaCrown } from "react-icons/fa";

interface ILogoProps {
    open?: boolean
    className?: string
}

export const Logo: FC<ILogoProps> = ({open, className}) => {
    return (
        <Link href="/" className="flex items-center gap-3 text-white">
            <div className="bg-slate-600 rounded-lg p-3">
                <FaCrown size={20}/>
            </div>
            <div className={clsx("text-[20px] whitespace-nowrap", open ? "block" : "hidden", className)}>
                Королева красоты
            </div>
        </Link>
    )
}