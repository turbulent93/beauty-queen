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
                "px-6 py-3 border border-gray-300 bg-gray-100 rounded-md mx-1 min-[416px]:mx-auto mt-[30px] mb-3", 
                orientation == "horizontal" ? "flex md:items-end flex-col md:flex-row max-w-[600px]" : "max-w-[400px]",
                className
            )}
            onSubmit={onSubmit}>
            {children}
        </form>
    )
}