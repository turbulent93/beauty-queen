import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface IContainerProps {
    className?: string
    maxWidth?: number
}

export const Container: FC<PropsWithChildren<IContainerProps>> = ({children, className, maxWidth}) => {
    return (
        <div className={clsx("mx-auto px-4", className)} style={{maxWidth: maxWidth || 1100}}>
            {children}
        </div>
    )
}