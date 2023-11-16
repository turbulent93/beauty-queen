import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const AdminHeader: FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <div className={clsx("flex flex-col sm:flex-row justify-end items-center sm:gap-3 mb-6 sm:h-[80px] pt-4 sm:pt-0 px-4", className)}>
            {children}
        </div>
    )
}