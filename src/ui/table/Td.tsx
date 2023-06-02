import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface TdProps {
    className?: string
}

export const Td: FC<PropsWithChildren<TdProps>> = ({className, children}) => {
    return (
        <td className={clsx("p-3", className || "text-center")}>{children}</td>
    )
}