import { IService } from "@/services/service/service.interface";
import { Button } from "@/ui/Button";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { getDiscountedPrice } from "@/utils/services/getDiscountedPrice";
import clsx from "clsx";
import { FC, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"

interface PriceListProps {
    handler: (service: IService) => void
    serviceId?: number 
    services?: IService[]
    enableHide?: boolean
    discount?: number
    unit?: string
}

export const PriceList: FC<PriceListProps> = ({handler, serviceId, services, enableHide = true, discount, unit}) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div style={{
                height: show || (services && services.length < 5) ? undefined :  57 * 5 + 1, 
                overflowY: "hidden"
            }}>
                <Table>
                    {
                        services?.map(service => (
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
                                        getDiscountedPrice(service.price, discount, unit)
                                    }
                                </Td>
                                <Td>
                                    {service.duration + " мин"}
                                </Td>
                                <Td>
                                    <Button 
                                        onClick={() => handler(service)}>
                                        Записаться
                                    </Button>
                                </Td>
                            </tr>
                        ))
                    }
                </Table>
            </div>
            {
                enableHide && services && services.length > 5 && (
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