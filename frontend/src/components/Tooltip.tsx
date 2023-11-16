import { FC, PropsWithChildren } from "react";

interface ITooltipProps {
    message: string
}

export const Tooltip: FC<PropsWithChildren<ITooltipProps>> = ({children, message}) => {
    return (
        <div className="group relative">
            {children}
            <span 
                className="absolute z-30 top-[calc(100%+0.3em)] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100"
            >{message}</span>
        </div>
    )
}