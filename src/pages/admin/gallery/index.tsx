import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ServiceService } from "@/services/service/service.service";
import { useEffect, useState } from "react"
import clsx from "clsx";
import { Loader } from "@/ui/Loader";
import { GalleryService } from "@/services/gallery/gallery.service";
import { Button } from "@/ui/Button";
import { IService } from "@/services/service/service.interface";
import Link from "next/link";
import { IPhoto } from "@/services/gallery/gallery.interface";
import { RiDeleteBin5Line } from "react-icons/ri";

const GALLERY_IMAGES_URL = "https://localhost:7169/files/gallery"

const getColumns = (photos: IPhoto[]) => {
    const arr: IPhoto[][] = []
    const size = 2

    for (let i = 0; i < Math.ceil(photos.length/size); i++) {
        arr[i] = photos.slice(i * size, i * size + size)
    }

    return arr
}

const AdminGallery: NextPage = () => {
    const [selectedService, setSelectedService] = useState<IService>()

    const {data: services, isLoading: isServicesLoading} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => setSelectedService(data[0])
    })

    const queryClient = useQueryClient()
    
    const {data: photos ,isLoading: isPhotosLoading} = useQuery(
        ["get photos", selectedService?.id], 
        () => GalleryService.get(selectedService?.id!), 
        {
            enabled: !!selectedService,
            select: ({data}) => data
        })

    const removeMutation = useMutation((id: number) => GalleryService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get photos", selectedService?.id])
        }
    })
        
    return (
        <Layout title="Галерея">
            <Sidebar>
                <AdminHeader>Галерея</AdminHeader>
                <Container>
                    <div className="flex gap-3 mt-4">
                        {
                            isServicesLoading ? <Loader/> :
                            services?.map(service => (
                                <h3 
                                    className={clsx(
                                        " rounded px-3 py-1 cursor-pointer",
                                        service == selectedService ? 
                                            "bg-slate-500 text-white hover:bg-slate-600" :
                                            "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                    )} 
                                    onClick={() => setSelectedService(service)}
                                    key={service.id}>
                                    {service.name}
                                </h3>
                            ))  
                        }
                        {
                            selectedService && (
                                <Button theme="gray" className="ml-auto">
                                    <Link href={`gallery/add/${selectedService.id}`}>
                                        Добавить фотографию
                                    </Link>
                                </Button>
                            )
                        }
                    </div>
                    <div className="my-6 grid grid-cols-4 gap-4">
                        {
                            isPhotosLoading ? <Loader/> :
                            photos && getColumns(photos).map((col, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    {
                                        col.map(photo => (
                                            <div className="relative" key={photo.id}>
                                                <img 
                                                    src={`${GALLERY_IMAGES_URL}/${photo.source}`}
                                                    className="w-full rounded-sm object-cover"/>
                                                <div 
                                                    className="absolute top-0 right-0 rounded-bl px-3 py-2 bg-red-500 cursor-pointer"
                                                    onClick={() => removeMutation.mutate(photo.id)}>
                                                    <div className="h-4 w-4 text-white">
                                                        <RiDeleteBin5Line />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )) 
                        }
                    </div>
                </Container>
            </Sidebar>
        </Layout>
    )
}

export default AdminGallery