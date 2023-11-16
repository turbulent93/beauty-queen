import { Button } from "@/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Container } from "../Container";
import { RxHamburgerMenu } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai";
import { links } from "./links";
import { DropDownMenu } from "./DropDownMenu";
import { Logo } from "../Logo";
import { NavLink } from "./NavLink";

export const Nav: FC = () => {
    const {asPath} = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-slate-500 w-full">
            <Container>
                <nav className="flex justify-between py-4 items-center">
                    <Logo className="hidden md:block"/>
                    <div className="flex items-center">
                        <div className="gap-1 md:flex items-center hidden">
                            {
                                links.map((item, i) => (
                                    <NavLink item={item} key={i}/>
                                ))
                            }
                        </div>
                        <Link href="/appointment" className="ml-4">
                            <Button>
                                Записаться
                            </Button>
                        </Link>
                        <div className="ml-2 visible md:hidden text-white" onClick={() => setOpen(!open)}>
                            {
                                open ? 
                                    <AiOutlineClose size={32}/> : 
                                    <RxHamburgerMenu size={32}/>
                            }
                        </div>    
                        <DropDownMenu 
                            open={open} 
                            setOpen={setOpen} />
                    </div>
                </nav>
            </Container>
        </div>
    )
}