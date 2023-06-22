import clsx from "clsx";
import { FC } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IconType } from "react-icons/lib";

interface ProgressCellProps {
    Icon: IconType
    isSelected: boolean
}

export const ProgressCell: FC<ProgressCellProps> = ({Icon, isSelected}) => {
    return (
        <div className={clsx(
            "h-10 w-10 rounded-full flex items-center justify-center text-white", 
            isSelected ? "bg-slate-500" : "bg-slate-400"
        )}>
        {
            isSelected ? 
            <AiOutlineCheck/> :
            <Icon/>
        }
    </div>
    )
}