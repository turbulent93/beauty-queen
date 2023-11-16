import clsx from "clsx";
import { FC, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

interface CheckboxProps {
    value?: boolean
    onChange: (value?: boolean) => void
    label: string
    uncheck?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({value, onChange, label, uncheck}) => {
    useEffect(() => {
        if(uncheck) 
            onChange(false)
    }, [uncheck])

    return (
        <div className="flex gap-3 items-center mb-3" onClick={() => onChange(!value)}>
            <div className={clsx(
                "w-6 h-6 rounded-md flex items-center justify-center text-white cursor-pointer", 
                value ? "bg-red-400" : "border border-gray-300" 
            )}>
                {
                    value && <AiOutlineCheck size={18} />
                }
            </div>
            <label>
                {label}
            </label>
        </div>
    )
}