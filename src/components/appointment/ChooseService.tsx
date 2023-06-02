import { useDebounce } from "@/hooks/useDebounce";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { setService } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { Search } from "@/ui/Search";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { Th } from "@/ui/table/Th";
import { FC, useState } from "react";
import { useQuery } from "react-query";

interface ChooseServiceProps {
    goNext: () => void
}

export const ChooseService: FC<ChooseServiceProps> = ({goNext}) => {
    const [search, setSearch] = useState("")
    const dispatch = useAppDispatch()
    const debounce = useDebounce(search)
    const serviceId = useAppSelector(store => store.appointment.appointment.serviceId)
    const [selectedService, setSelectedService] = useState<IService>()

    const {data, isLoading} = useQuery(["search services", debounce], 
        () => ServiceService.get(debounce), {
            select: ({data}) => data,
            onSuccess: (data) => {
                setSelectedService(data?.find(service => service.id == serviceId))
                console.log(search)
            }
        })

    const handler = (x: IService) => {
        dispatch(setService(x))
        goNext()
    }

    return (
        <>
            <div className="flex">
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className="my-4 w-[220px] mr-auto"
                    placeholder="Поиск услуги..."/>
                {
                    isLoading && <Loader />
                }
            </div>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(service => (
                            <tr 
                                onClick={() => handler(service)} 
                                className={"cursor-pointer hover:border hover:border-gray-200" + (
                                    selectedService == service &&
                                        " bg-slate-400 text-white"
                                )}
                                key={service.id}>
                                <Td>
                                    {service.name}
                                </Td>
                                <Td>
                                    {service.price}
                                </Td>
                                <Td>
                                    {service.duration + " мин"}
                                </Td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}