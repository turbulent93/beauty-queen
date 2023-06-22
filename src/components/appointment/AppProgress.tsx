import clsx from "clsx";
import { FC } from "react";
import { AiOutlineCheck, AiOutlinePhone, AiOutlineSchedule, AiOutlineUser } from "react-icons/ai";
import { BsScissors } from "react-icons/bs";
import { ProgressCell } from "./ProgressCell";

interface AppProgressProps {
    serviceSelected: boolean
    employeeSelected: boolean
    dateSelected: boolean
    phoneSelected: boolean
}

export const AppProgress: FC<AppProgressProps> = ({serviceSelected, employeeSelected, dateSelected, phoneSelected}) => {
    return (
        <div className="relative h-20 flex justify-between items-center w-[380px] mx-auto">
            <hr className="absolute top-1/2 w-full h-[2px] my-auto bg-slate-300 border-0 dark:bg-gray-700 -z-10"/>
            <ProgressCell Icon={BsScissors} isSelected={serviceSelected} />
            <ProgressCell Icon={AiOutlineUser} isSelected={employeeSelected} />
            <ProgressCell Icon={AiOutlineSchedule} isSelected={dateSelected} />
            <ProgressCell Icon={AiOutlinePhone} isSelected={phoneSelected} />
        </div>
    )
}