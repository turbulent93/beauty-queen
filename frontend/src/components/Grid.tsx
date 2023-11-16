import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface IGridProps {
    className?: string
}

export const Grid: FC<PropsWithChildren<IGridProps>> = ({children, className}) => {
    return (
        <div className={clsx("grid grid-cols-7 gap-3", className)}>
            {children}
        </div>
    )
}