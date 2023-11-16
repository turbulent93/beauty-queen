import clsx from "clsx";
import { FC } from "react"

interface LoaderProps {
    className?: string
}

export const Loader: FC<LoaderProps> = ({className}) => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

    return (
        <div className={clsx("flex text-red-500 mx-auto w-[40px] mt-8", className)}>
            <div 
                className={`${circleCommonClasses} mr-1 animate-bounce`} />
            <div 
                className={`${circleCommonClasses} mr-1 animate-[bounce_1s_infinite_200ms]`} />
            <div 
                className={`${circleCommonClasses} animate-[bounce_1s_infinite_400ms]`} />
        </div>
    );
};