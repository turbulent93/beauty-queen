import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface FormProps {
    children: React.ReactNode[]
    className?: string
    onSubmit: () => void
    orientation?: "vertical" | "horizontal"
}

export const Form: FC<PropsWithChildren<FormProps>> = ({children, className, onSubmit, orientation = "vertical"}) => {
    return (
        <form 
            className={clsx(
                "px-6 py-3 border border-gray-300 bg-gray-100 rounded-md mx-auto mt-[20px]", 
                orientation == "horizontal" ? "flex items-end w-[600px]" : "w-[400px]",
                className
            )}
            onSubmit={onSubmit}>
            {children}
        </form>
    )
}