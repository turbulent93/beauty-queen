import { useDebounce } from "@/hooks/useDebounce";
import { ModeType } from "@/interfaces/mode.interface";
import { GalleryService } from "@/services/gallery/gallery.service";
import { ServiceService } from "@/services/service/service.service";
import { Search } from "@/ui/Search";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Container } from "../Container";
import { PhotosList } from "./PhotosList";
import { ServiceSelect } from "./ServiceSelect";

interface GalleryProps {
    mode?: ModeType
}

export const Gallery: FC<GalleryProps> = ({mode = "master"}) => {
    const [selectedService, setSelectedService] = useState<number>()
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const {data: services} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => setSelectedService(data[0].id)
    })
    
    const {data: photos} = useQuery(
        ["get photos", selectedService, debounce], 
        () => GalleryService.get(selectedService!, debounce), 
        {
            enabled: !!selectedService,
            select: ({data}) => data
        })

    return (
        <Container>
            <ServiceSelect 
                services={services} 
                selectedService={selectedService} 
                setSelectedService={setSelectedService}
                mode={mode} />
            <Search 
                search={search} 
                setSearch={setSearch} 
                className="w-[300px] my-6"
                placeholder="Поиск по названию.."/>
            <PhotosList 
                photos={photos} 
                mode={mode} />
        </Container>
    )
}