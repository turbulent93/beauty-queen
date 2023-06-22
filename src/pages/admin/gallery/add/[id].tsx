import { catchError } from "@/api/api.handler";
import { PhotoForm } from "@/components/forms/PhotoForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/useToast";
import { IPhotoDto } from "@/services/gallery/gallery.interface";
import { GalleryService } from "@/services/gallery/gallery.service";
import { Error } from "@/ui/Error";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const AddPhoto: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    if(!Number(id)) {
        return <Error/>
    }

    const queryClient = useQueryClient()
    
    const addMutation = useMutation((data: IPhotoDto) => GalleryService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get photos", id])
            router.replace("/admin/gallery")
        },
        onError: (error: AxiosError) => useToast(catchError(error))
    })

    return (
        <Layout title="Добавить фото" role="Сотрудник">
            <Sidebar>
                <PhotoForm 
                    serviceId={Number(id)}
                    mutate={(data) => {
                        addMutation.mutate(data)
                    }}/>
            </Sidebar>
        </Layout>
    )
}

export default AddPhoto