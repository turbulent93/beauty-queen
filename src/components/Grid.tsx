import { FC, PropsWithChildren } from "react";

export const Grid: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="grid grid-cols-10 gap-3">
            {children}
        </div>
    )
}