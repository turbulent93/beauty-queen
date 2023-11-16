import { IFile } from "@/services/upload/upload.interface"
import { AxiosResponse } from "axios"
import { useMutation } from "react-query"
import { useErrorToast, useSuccessToast } from "./useToast"

export const useImageMutation = (
    setImage: (value: IFile[]) => void, 
    uploadImage: (images: FileList) => Promise<AxiosResponse<IFile[], any>>
) => {
    const mutation = useMutation(uploadImage,
    {
        onSuccess: (data) => {
            setImage(data?.data)
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return mutation
}