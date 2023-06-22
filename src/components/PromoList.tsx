import { IPromo } from "@/services/promo/promo.interface";
import { Button } from "@/ui/Button";
import Link from "next/link";
import { FC, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface PromoListProps {
    promos: IPromo[]
}

const PROMO_IMAGES_URL = "http://localhost:7169/files/promo"

const getDate = (d: Date) => {
    const date = new Date(d)
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()

    return day + "." + month
}

export const PromoList: FC<PromoListProps> = ({promos}) => {
    const scrollRight = () => {
        const content = document.getElementById("content")
        if(content)
            content.scrollLeft += 1100
    }

    const scrollLeft = () => {
        const content = document.getElementById("content")
        if(content)
            content.scrollLeft -= 1100
    }

    useEffect(() => {
    }, [])

    return (
        <div className="relative">
            <div className="absolute top-1/2 left-4 cursor-pointer text-white" onClick={() => scrollLeft()}>
                <BsChevronCompactLeft size={26}/>
            </div>
            <div className="flex flex-nowrap overflow-x-hidden scroll-smooth gap-3" id="content">
                {
                    promos.map(promo => (
                        <div    
                            key={promo.id}
                            className="py-6 rounded-md flex shrink-0 justify-center gap-5 bg-slate-400 w-full duration" 
                            onClick={() => scrollRight()}>
                            <img src={`${PROMO_IMAGES_URL}/${promo.image}`} className="object-cover w-[450px] h-56"/>
                            <div className="w-px h-full border-r"/>
                            <div className="w-[450px]">
                                <h3 className="text-[32px] mb-3 text-white">
                                    {promo.title}
                                </h3>
                                <span className="text-white px-4 py-2 rounded-sm bg-red-300 text-[16px]">
                                        {"C " + getDate(promo.periodFrom) + " до " + getDate(promo.periodTo)}
                                    </span>
                                <div className="whitespace-pre-line my-2 text-white">
                                    {promo.description}
                                </div>
                                <Button>
                                    <Link href={{pathname: "/appointment", query: {promoId: promo.id}}}>
                                        Записаться
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="absolute top-1/2 right-4 cursor-pointer text-white" onClick={() => scrollRight()}>
                <BsChevronCompactRight size={26}/>
            </div>
        </div>
    )
}