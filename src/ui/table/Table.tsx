import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface TableProps {
    className?:  string
    container?: number
}

export const Table: FC<PropsWithChildren<TableProps>> = ({children, className, container}) => {
    return (
        <div className={clsx(
            "mx-auto overflow-y-auto scrollbar scrollbar-gray pb-1 border", 
            // `max-w-[${container ? String(container) : 1200}px]`,
            container ? `max-w-[${String(container)}px]` : "max-w-[1200px]",
            // "max-w-[600px]",
            className
        )}>
            <table className="w-full whitespace-nowrap">
                {children}
            </table>
        </div>
    )
}