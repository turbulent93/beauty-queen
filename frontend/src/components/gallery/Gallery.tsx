import { useDebounce } from "@/hooks/useDebounce";
import { GalleryService } from "@/services/gallery/gallery.service";
import { ServiceService } from "@/services/service/service.service";
import { Search } from "@/ui/Search";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Container } from "../Container";
import { PhotosList } from "./PhotosList";
import { ServiceSelect } from "./ServiceSelect";

interface GalleryProps {
}

export const Gallery: FC<GalleryProps> = () => {
    const [selectedService, setSelectedService] = useState<number>()
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const {data: services} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => {
            if(data.length > 0)
                setSelectedService(data[0].id)
        }
    })
    
    const {data: photos} = useQuery(
        ["get photos", selectedService, debounce], 
        () => GalleryService.get(), 
        {
            enabled: !!selectedService,
            select: ({data}) => data
        })

    return (
        <Container>
            <ServiceSelect 
                services={services} 
                selectedService={selectedService} 
                setSelectedService={setSelectedService}/>
            <Search 
                search={search} 
                setSearch={setSearch} 
                className="max-w-[300px] my-6"
                placeholder="Поиск по названию.."/>
            <PhotosList 
                photos={photos} />
        </Container>
    )
}