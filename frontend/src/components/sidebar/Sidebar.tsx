import { FC, PropsWithChildren } from "react";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { SidebarBody } from "./SidebarBody";

export const Sidebar: FC<PropsWithChildren> = ({children}) => {
    return (
        <SidebarProvider>
            <div className="flex flex-col">
                <SidebarBody/>
                <div className="sm:ml-[80px]">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}