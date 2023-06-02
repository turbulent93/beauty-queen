import { FC, PropsWithChildren } from "react";

export const TableContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="max-w-[800px] mx-auto overflow-y-auto scrollbar scrollbar-gray pb-1">
            {children}
        </div>
    )
}