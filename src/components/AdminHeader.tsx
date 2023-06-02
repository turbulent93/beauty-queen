import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const AdminHeader: FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <div className={clsx("flex justify-end p-2 border border-b items-center", className)}>
            {children}
        </div>
    )
}