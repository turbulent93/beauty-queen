import { useDebounce } from "@/hooks/useDebounce";
import { IService } from "@/services/service/service.interface";
import { Button } from "@/ui/Button";
import { Search } from "@/ui/Search";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { Th } from "@/ui/table/Th";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"

interface PriceListProps {
    handler: (service: IService) => void
    serviceId?: number 
    services?: IService[]
    enableHide?: boolean
    discount?: number
}

export const PriceList: FC<PriceListProps> = ({handler, serviceId, services, enableHide = true, discount}) => {
    const [show, setShow] = useState(false)
    const [viewedServices, setViewedServices] = useState(services)

    useEffect(() => {
        if(show) {
            setViewedServices(services)
        } else if(enableHide) {
            setViewedServices(services?.slice(0, 3))
        }
    }, [show, services])

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <Th>
                            Название
                        </Th>
                        <Th>
                            Цена
                        </Th>
                        <Th>
                            Длительность
                        </Th>
                        <Th></Th>
                    </tr>
                </thead>
                <tbody>
                    {
                        viewedServices?.map(service => (
                            <tr 
                                className={clsx(
                                    "cursor-pointer duration-500", 
                                    service.id == serviceId && "bg-slate-200"
                                )}
                                key={service.id}>
                                <Td>
                                    {service.name}
                                </Td>
                                <Td>
                                    {
                                        discount ? 
                                            service.price - Math.ceil(service.price / 100 * discount) + " (-" + discount + "%)" :
                                            service.price
                                    }
                                </Td>
                                <Td>
                                    {service.duration + " мин"}
                                </Td>
                                <Td>
                                    <Button 
                                        theme="gray" 
                                        onClick={() => handler(service)}>
                                        Записаться
                                    </Button>
                                </Td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {
                enableHide && (
                    <div className="flex mt-3">
                        <div className="bg-slate-500 px-3 py-1 text-white rounded-sm mx-auto cursor-pointer" onClick={() => setShow(!show)}>
                            <div>
                                {
                                    !show ? <AiOutlineArrowDown size={20}/> : <AiOutlineArrowUp size={20}/>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}