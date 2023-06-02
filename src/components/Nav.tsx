import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaCrown } from "react-icons/fa";
import { Container } from "./Container";

interface INavItem {
    path: string
    name: string
}

const navItems: INavItem[] = [
    {
        path: "/about-us",
        name: "О нас"
    },
    {
        path: "/admin/employees",
        name: "Admin"
    },
    {
        path: "/appointment",
        name: "Записаться"
    }
]

export const Nav: FC = () => {
    const {asPath} = useRouter()

    return (
        <div className="bg-slate-500 w-full">
            <Container>
                <nav className="flex justify-between py-4">
                    <Link href="/" className="flex gap-3 text-white items-center">
                        <div>
                            <FaCrown size={28}/>
                        </div>
                        <h1 className="text-white cursor-pointer select-none text-[20px]">Королева Красоты</h1>
                    </Link>
                    <div className="gap-3 flex">
                        {
                            navItems.map(x => (
                                <Link key={x.name} href={x.path} className={clsx("select-none", 
                                    x.path == asPath ? "text-red-200" : "text-white"
                                )}>
                                    {x.name}
                                </Link>
                            ))
                        }
                    </div>
                </nav>
            </Container>
        </div>
    )
}