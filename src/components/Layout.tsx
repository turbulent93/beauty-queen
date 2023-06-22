import { useAuth } from "@/providers/AuthProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

interface LayoutProps {
    children: React.ReactNode
    title: string
    description?: string
    role?: "Админ" | "Сотрудник"
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({children, title, description, role}) => {
    const {user} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(role == "Сотрудник" && !user) {
            router.replace("/admin/auth")
        } else if (role == "Админ" && user?.role != "Админ") {
            router.replace("/admin/appointments")
        }
    }, [])

    return (
        <>
            <Head>
                <title>{title}</title>
                {
                    description ? 
                    <meta name="description" content={description}/> : (
                        <meta name="robots" content="noindex"/>
                    )}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                description ?
                <div className="flex flex-col min-h-screen">
                    <Nav/>
                    <main className="grow">
                        {children}
                    </main>
                    <Footer/> 
                </div>:
                <div>
                {children}
                </div>
            }
        </>
    )
}