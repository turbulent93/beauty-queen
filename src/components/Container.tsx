import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const Container: FC<PropsWithChildren<{className?: string}>> = ({children, className}) => {
    return (
        <div className={clsx("w-[1100px] mx-auto px-2", className)}>
            {children}
        </div>
    )
}