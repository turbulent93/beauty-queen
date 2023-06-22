import Link from "next/link";
import { FC } from "react";
import { SlSocialVkontakte } from "react-icons//sl"
import { Container } from "./Container";

export const Footer: FC = () => {
    return (
        <footer className="w-full h-28 bg-gray-700 shrink-0">
            <div className="flex w-[800px] justify-between text-white items-center mx-auto pt-10">
                <h2 className="">
                    Контактная информация
                </h2>
                <span className="font-light">
                    8 (928) 982-0923
                </span>
                <span className="font-light">
                    beauty-queen@gmail.com
                </span>
                <Link className="flex items-center gap-2 font-light" href={""}>
                    <div>
                        <SlSocialVkontakte size={22}/>
                    </div>
                    ВКонтакте
                </Link>
            </div>
        </footer>
    )
}