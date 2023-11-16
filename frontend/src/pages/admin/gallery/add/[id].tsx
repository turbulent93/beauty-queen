import { PhotoForm } from "@/components/forms/PhotoForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IPhotoDto } from "@/services/gallery/gallery.interface";
import { GalleryService } from "@/services/gallery/gallery.service";
import { Error } from "@/ui/Error";
import { PagePermissions } from "@/utils/constants/pagePermissions";
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
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Добавить фото" permissions={PagePermissions.galleryPage}>
            <PhotoForm 
                serviceId={Number(id)}
                mutate={(data) => {
                    addMutation.mutate(data)
                }}/>
        </Layout>
    )
}

export default AddPhoto