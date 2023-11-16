import { IPromo } from "@/services/promo/promo.interface";
import { Button } from "@/ui/Button";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface PromoListProps {
    promos: IPromo[]
}

const SERVER_URL = process.env.SERVER_URL!

export const PromoList: FC<PromoListProps> = ({promos}) => {
    const [step, setStep] = useState(0)

    const toLeft = () => {
        if(step == 0) {
            setStep(promos.length - 1)
        } else {
            setStep(step - 1)
        }
    }

    const toRight = () => {
        if(step == promos.length - 1) {
            setStep(0)
        } else {
            setStep(step + 1)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => toRight(), 4000)

        return () => clearTimeout(timeout)
    }, [step])

    return (
        <div className="relative">
            <div 
                className="absolute top-1/2 left-2 cursor-pointer text-white hidden sm:block" 
                onClick={toLeft}
            >
                <BsChevronCompactLeft size={26}/>
            </div>
            <div    
                key={promos[step].id}
                className="rounded-md bg-slate-400 w-full flex flex-col sm:flex-row justify-between p-3 sm:p-10 sm:divide-x-[1px] sm:divide-white/50"
            >
                <img 
                    src={`${SERVER_URL}/${promos[step].image}`} 
                    className="object-cover w-full h-64 sm:w-1/2 rounded-md mr-6 mb-3" 
                />
                <div 
                    className="w-full sm:w-1/2 sm:pl-6"
                >
                    <div 
                        className="text-white mb-3 px-3 py-1 rounded-md bg-red-300/50 absolute top-3 sm:top-10 right-3 sm:right-1/2"
                    >
                        {
                            "C " + promos[step].periodFrom + " до " + promos[step].periodTo
                        }
                    </div>
                    <h3 
                        className="mb-3 text-[20px] sm:text-[28px] text-white text-center sm:text-left"
                    >
                        {
                            promos[step].title
                        }
                    </h3>   
                    <pre 
                        className="mb-3 text-white text-center sm:text-left font-sans whitespace-normal h-16"
                    >
                        {promos[step].description}
                    </pre>
                    <Button className="w-full sm:w-auto">
                        <Link href={{pathname: "/appointment", query: {promoId: promos[step].id}}}>
                            Записаться
                        </Link>
                    </Button>
                </div>
            </div>
            <div 
                className="absolute top-1/2 right-2 cursor-pointer text-white hidden sm:block"
                onClick={toRight}
            >
                <BsChevronCompactRight size={26}/>
            </div>
        </div>
    )
}