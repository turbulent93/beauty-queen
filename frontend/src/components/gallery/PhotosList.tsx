import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { EditModeType } from "@/interfaces/mode.interface";
import { IPhoto } from "@/services/gallery/gallery.interface";
import { GalleryService } from "@/services/gallery/gallery.service";
import { FC } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";

const GALLERY_IMAGES_URL = process.env.GALLERY_IMAGES_URL

interface GalleryProps {
    photos?: IPhoto[]
    serviceId?: number
    mode?: EditModeType
}

export const PhotosList: FC<GalleryProps> = ({photos, mode = "user", serviceId}) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation((id: number) => GalleryService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get photos", serviceId])
            queryClient.invalidateQueries(["get photos"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const deleteHandler = (id: number) => {
        deleteMutation.mutate(id)
    }
    
    return (
        <div className="my-6 grid grid-cols-1 min-[390px]:grid-cols-2 sm:grid-cols-4 gap-4">
            {
                photos?.map(photo => (
                    <div className="relative" key={photo.id}>
                        <img 
                            src={`${GALLERY_IMAGES_URL}/${photo.file.source}`}
                            className="w-full rounded-sm object-cover h-80"/>
                        {
                            mode == "admin" && (
                                <div 
                                    className="absolute top-0 right-0 rounded-bl px-3 py-2 bg-red-500 cursor-pointer"
                                    onClick={() => deleteHandler(photo.id)}>
                                    <div className="h-4 w-4 text-white">
                                        <RiDeleteBin5Line />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}