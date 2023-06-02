import { FC, PropsWithChildren } from "react";

export const FormTitle: FC<PropsWithChildren> = ({children}) => {
    return (
        <h2 className="text-gray-500 text-[22px] mb-4">
            {children}
        </h2> 
    )
}