import { IContactSettings } from "@/services/settings/settings.interface";
import Link from "next/link";
import { FC } from "react";
import { SlSocialVkontakte } from "react-icons//sl"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

interface IFooterProps {
    contactSettings: IContactSettings
}

export const Footer: FC<IFooterProps> = ({contactSettings: {phone, mail, vk, address}}) => {

    if(!phone && !mail && !vk && !address) {
        return null
    }

    return (
        <footer className="w-full bg-gray-700 shrink-0 mt-3">
            <div className="flex flex-col justify-center text-white items-center mx-auto py-8 px-6">
                <div className="flex gap-6">
                    {
                        phone && (
                            <a className="font-light p-2 bg-red-400 rounded-full" href={`tel:${phone}`}>
                                <div>
                                    <AiOutlinePhone size={18}/>
                                </div>
                            </a>
                        )
                    }
                    {
                        mail && (
                            <a className="p-2 bg-slate-600 rounded-full" href={`mailto:${mail}`}>
                                <div>
                                    <AiOutlineMail size={18}/>
                                </div>
                            </a>
                        )
                    }
                    {
                        vk && (
                            <Link className="p-2 bg-slate-600 rounded-full" href={vk}>
                                <div>
                                    <SlSocialVkontakte size={20} />
                                </div>
                            </Link>
                        )
                    }
    
                </div>
                {
                    address && (
                        <span className="mt-4 text-gray-200">
                            {address}
                        </span>
                    )
                }
            </div>
        </footer>
    )
}