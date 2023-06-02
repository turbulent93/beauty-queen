import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Nav } from "./Nav";

interface LayoutProps {
    children: React.ReactNode
    title: string
    description?: string
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({children, title, description}) => {
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
            <main className="">
                {
                    description && <Nav/>
                }
                {children}
            </main>
        </>
    )
}