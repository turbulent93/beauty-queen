import { useDebounce } from "@/hooks/useDebounce";
import { IAppointmentFormConext } from "@/pages/appointment";
import { PromoService } from "@/services/promo/promo.service";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { Search } from "@/ui/Search";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { PriceList } from "../lists/PriceList";

export const ChooseService: FC = () => {
    const {reset, getValues, watch} = useFormContext<IAppointmentFormConext>()
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const promoId = watch("promoId")
    const employeeId = watch("employeeId")

    const handler = ({id, duration}: IService) => {
        reset({
            ...getValues(),
            serviceId: id,
            duration: duration,
            step: getValues("step") + 1
        })
    }

    const {data: promo} = useQuery(["get promo", getValues("promoId")], () => PromoService.getById(promoId!), {
        enabled: !!promoId,
        select: ({data}) => data
    })

    const {data: services} = useQuery(["get services", employeeId, promoId, debounce], 
        () => ServiceService.get(search, employeeId, promoId), {
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
                discount={promo?.discount}
                unit={promo?.unit.name} />
        </>
    )   
}