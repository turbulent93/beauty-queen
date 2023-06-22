import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface IButtonProps {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    theme?: "red" | "gray" | "light-gray",
    disabled?: boolean
}

export const Button: FC<PropsWithChildren<IButtonProps>> = ({children, disabled = false, onClick, className, theme = "light-gray"}) => {
    return (
        <button 
            className={clsx("rounded-sm px-2 py-1", className, disabled && "cursor-default", {
                // "border border-gray-600": theme == null,
                "text-white bg-red-400": theme == "red",
                "bg-slate-100": theme == "light-gray",
                "bg-slate-500 text-white": theme == "gray" && !disabled,
                "bg-slate-400 text-white": theme == "gray" && disabled
            })}
            disabled={disabled}
            onClick={onClick}
            >{children}
        </button>
    )
}