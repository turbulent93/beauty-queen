import { FC, PropsWithChildren } from "react";

export const DangerText: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="text-red-800 bg-red-50 p-4 rounded-md mt-4">
            {children}
        </div>
    )
}