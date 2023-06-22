import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUserDto } from "@/services/auth/auth.interface";
import { IRole } from "@/services/roles/roles.interface";
import { FC, PropsWithChildren, createContext, useState, useContext, useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode
}

interface IAuthContext {
    user?: IUserDto
    setUser: (value: IUserDto | undefined) => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const STORED_USER = "beauty-queen-user"

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
    const [user, setUser] = useState<IUserDto>()

    useEffect(() => {
        const user = localStorage.getItem(STORED_USER)
        if(!user || user == "undefined") return

        setUser(JSON.parse(user))
    }, [])

    useEffect(() => {
        if(typeof user == "undefined") {
            localStorage.removeItem(STORED_USER)
        } else {
            localStorage.setItem(STORED_USER, JSON.stringify(user))
        }
    }, [user])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) as IAuthContext