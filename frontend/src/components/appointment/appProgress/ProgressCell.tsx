import { IAppointmentFormConext } from "@/pages/appointment";
import clsx from "clsx";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { IconType } from "react-icons/lib";

interface ProgressCellProps {
    Icon: IconType
    isSelected: boolean
    isError?: boolean
    step: number
}

export const ProgressCell: FC<ProgressCellProps> = ({Icon, isSelected, isError, step}) => {
    const {setValue} = useFormContext<IAppointmentFormConext>()

    return (
        <div className={clsx(
            "h-10 w-10 rounded-full flex items-center justify-center text-white", 
            isError ? "bg-red-300" : 
                isSelected ? "bg-slate-500" : 
                    "bg-slate-400",
        )}
        onClick={() => setValue("step", step)}>
        {
            isSelected ? 
            <AiOutlineCheck/> :
            <Icon/>
        }
    </div>
    )
}