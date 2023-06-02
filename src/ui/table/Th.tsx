import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const Th: FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <th className={clsx("p-3 text-gray-600 min-w-16 text-center", className)}>{children}</th>
    )
}