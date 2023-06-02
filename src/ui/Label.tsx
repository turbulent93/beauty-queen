import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface LabelProps {
    children: React.ReactNode,
    className?: string
}

export const Label: FC<PropsWithChildren<LabelProps>> = ({children, className}) => {
    return (
        <div className={clsx("text-gray-500", className)}>
            {children}
        </div>
    )
}