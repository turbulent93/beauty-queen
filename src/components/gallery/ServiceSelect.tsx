import { ModeType } from "@/interfaces/mode.interface";
import { IService } from "@/services/service/service.interface";
import { Button } from "@/ui/Button";
import { Search } from "@/ui/Search";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface ServiceSelectProps {
    services?: IService[]
    mode?: ModeType
    setSelectedService: (value: number) => void
    selectedService?: number
}

export const ServiceSelect: FC<ServiceSelectProps> = ({services, mode = "user", setSelectedService, selectedService}) => {
    return (
        <div className="flex gap-3 items-start mt-6">
            <div className="flex gap-3 flex-wrap">
                {
                    services?.map(service => (
                        <Button 
                            onClick={() => setSelectedService(service.id)}
                            className={clsx(
                                "rounded px-3 py-1 cursor-pointer whitespace-nowrap",
                                service.id == selectedService ? 
                                    "bg-slate-500 text-white hover:bg-slate-600" :
                                    "bg-gray-200 text-gray-500 hover:bg-gray-300"
                            )} 
                            key={service.id}>
                            {service.name}
                        </Button>
                    ))  
                }
            </div>
            {
                mode == "admin" && selectedService && (
                    <Button theme="gray" className="ml-auto whitespace-nowrap inline-block">
                        <Link href={`/admin/gallery/add/${selectedService}`}>
                            Добавить фотографию
                        </Link>
                    </Button>
                )
            }
        </div>
    )
}