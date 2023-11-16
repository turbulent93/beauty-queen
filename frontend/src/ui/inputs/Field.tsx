import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface FieldProps {
    label?: string
    error?: boolean  
}

export const Field: FC<PropsWithChildren<FieldProps>> = ({children, label, error}) => {
    return (
        <>
            {
                label && (
                    <label
                        className={clsx("whitespace-nowrap text-gray-500")}>
                        {label}
                    </label>
                )
            }
            <div className={clsx("border rounded-sm py-1 px-3 outline-none bg-slate-100 w-full mt-3", !error && "mb-3")}>
                {children}
            </div>
            {
                error && (
                    <div className="text-red-400 text-[12px] mb-3 whitespace-nowrap">
                        *Обязательное поле
                    </div>
                )
            }
        </>
    )
}