import { ImageService } from "@/services/image/image.service"
import { AxiosResponse } from "axios"
import { useMutation } from "react-query"
import { useFormData } from "./useFormData"
import { useToast } from "./useToast"

export const useImageMutation = (setImage: (value: string | string[]) => void, uploadImage: (data: FileList) => Promise<AxiosResponse<string, any>>) => {
    const mutation = useMutation(uploadImage,
    {
        onError: () => useToast("Фотография не добавлена"),
        onSuccess: (data) => {
            useToast("Фотография добавлена", true)
            setImage(data?.data)
        }
    })

    return mutation
}