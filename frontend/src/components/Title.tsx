import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({children}) => {
    return (
        <h2 className="text-[22px] text-center my-6">
            {children}
        </h2>
    )
}