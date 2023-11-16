import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { useQuery } from "react-query";
import { ServiceService } from "@/services/service/service.service";
import { useState } from "react"
import { GalleryService } from "@/services/gallery/gallery.service";
import { Button } from "@/ui/Button";
import { ServiceSelect } from "@/components/gallery/ServiceSelect";
import { PhotosList } from "@/components/gallery/PhotosList";
import { Search } from "@/ui/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { PagePermissions } from "@/utils/constants/pagePermissions";

const AdminGallery: NextPage = () => { 
    const [selectedService, setSelectedService] = useState<number>()
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)
    const router = useRouter()

    const {data: services} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => {
            if(data.length > 0)
                setSelectedService(data[0].id)
        }
    })
    
    const {data: photos} = useQuery(
        ["get photos", selectedService, debounce], 
        () => GalleryService.get(selectedService, search), 
        {
            enabled: !!selectedService,
            select: ({data}) => data
        })
    
    return (
        <Layout title="Галерея" permissions={PagePermissions.galleryPage}>
            <AdminHeader>
                <Button onClick={() => router.push(`gallery/add/${selectedService}`,)}>
                    Добавить фото
                </Button>
            </AdminHeader>
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
        </Layout>
    )
}

export default AdminGallery