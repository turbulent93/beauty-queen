import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { INavItem } from "./links";
import { useState, useEffect }  from "react"

interface INavLinkProps {
    item: INavItem
}

export const NavLink: FC<INavLinkProps> = ({item: {isVisibleHandler, path, name, Icon}}) => {
    const {asPath} = useRouter()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if(isVisibleHandler)
            setShow(isVisibleHandler())
        else
            setShow(true)
    }, [])

    if(!show)
        return null

    return (
        <Link href={path} className={clsx("select-none px-3 py-2 text-white", 
            path == asPath && "bg-slate-600 rounded-lg"
        )}>
            {name}
            {Icon && <Icon size={20} />}
        </Link>
    ) 
}