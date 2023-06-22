import { useDebounce } from "@/hooks/useDebounce";
import { PromoService } from "@/services/promo/promo.service";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { setService } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader } from "@/ui/Loader";
import { Search } from "@/ui/Search";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { Th } from "@/ui/table/Th";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { PriceList } from "../PriceList";

interface ChooseServiceProps {
    goNext: () => void
    promoId?: number
}

export const ChooseService: FC<ChooseServiceProps> = ({goNext, promoId}) => {
    const dispatch = useAppDispatch()
    const app = useAppSelector(store => store.appointment.appointment)

    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const handler = (service: IService) => {
        dispatch(setService({...service}))
        goNext()
    }

    const {data: promo} = useQuery(["get promo", promoId], () => PromoService.getById(promoId!), {
        enabled: !!promoId,
        select: ({data}) => data
    })

    const {data: services} = useQuery(["get services", app.employeeId, promoId], 
        () => ServiceService.get(undefined, app.employeeId, promoId), {
        select: ({data}) => data
    })

    return (
        <>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    placeholder="Поиск по названию.." 
                    className="my-6 w-[300px]"/>
                <PriceList 
                    enableHide={false} 
                    handler={handler} 
                    services={services} 
                    discount={promo?.discount}/>
        </>
    )   
}