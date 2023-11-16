import { FC, PropsWithChildren, useState, createContext, useContext } from "react";

interface ISidebar {
    isOpen: boolean
    toggleIsOpen: () => void
}

const SidebarContext = createContext<ISidebar>({} as ISidebar)

export const SidebarProvider: FC<PropsWithChildren> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <SidebarContext.Provider value={{
            isOpen,
            toggleIsOpen
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext)