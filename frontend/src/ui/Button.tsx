import clsx from "clsx";
import { forwardRef, PropsWithChildren, HTMLAttributes } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    theme?: "red" | "gray" | "light-gray",
    disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonProps>>(({
    children, 
    disabled = false, 
    onClick, 
    className, 
    theme = "light-gray",
    ...props
}, ref) => {
    return (
        <button 
            {...props}
            ref={ref}
            className={clsx("rounded-sm px-2 py-1 whitespace-nowrap", className, disabled && "cursor-default", {
                "text-white bg-red-400": theme == "red",
                "text-white bg-red-200": theme == "red" && disabled,
                "bg-slate-100": theme == "light-gray" && !disabled,
                "bg-slate-100 text-gray-300": theme == "light-gray" && disabled,
                "bg-slate-500 text-white": theme == "gray" && !disabled,
                "bg-slate-400 text-white": theme == "gray" && disabled
            })}
            disabled={disabled}
            onClick={onClick}
            >{children}
        </button>
    )
})