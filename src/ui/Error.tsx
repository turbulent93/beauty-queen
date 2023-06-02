import clsx from "clsx";
import { FC } from "react";

interface ErrorProps {
    message?: string
    className?: string
}

export const Error: FC<ErrorProps> = ({message, className}) => {
    return (
        <div className={clsx("text-red-500 flex justify-center", className)}>
            {
                message || "Произошла ошибка"
            }
        </div>
    )
}