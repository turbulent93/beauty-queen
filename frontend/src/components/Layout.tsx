import { useAuth } from "@/hooks/useAuth";
import { IContactSettings } from "@/services/settings/settings.interface";
import { Error } from "@/ui/Error";
import { Loader } from "@/ui/Loader";
import { PermissionType } from "@/utils/constants/pagePermissions";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { LoginForm } from "./forms/LoginForm";
import { Nav } from "./navigation/Nav";
import { Sidebar } from "./sidebar/Sidebar";
import { ToastBar } from "./toast/ToastBar";

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
    title: string
    description?: string
    favicon?: string
    permissions?: PermissionType
    contactSettings?: IContactSettings
}

const SETTINGS_IMAGES_URL = process.env.SETTINGS_IMAGES_URL!

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({children, title, description, favicon, permissions, contactSettings}) => {
    const {isLoading, isError, user} = useAuth()

    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    if(!description && user && !permissions?.includes(user?.role.name)) {
        return null
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                {
                    description ? 
                        <>
                            <meta name="description" content={description}/>
                            <link rel="icon" href={SETTINGS_IMAGES_URL + "/" + favicon} />
                        </> :
                        <meta name="robots" content="noindex"/>
                }
            </Head>
            {
                description ?
                <div className="flex flex-col min-h-screen">
                    <Nav/>
                    <main className="grow">
                        {children}
                    </main>
                    {
                        contactSettings && <Footer contactSettings={contactSettings} />
                    } 
                </div> :
                user ? 
                <Sidebar>
                    {children}
                </Sidebar> : 
                <LoginForm />
            }
            <ToastBar/>
        </>
    )
}