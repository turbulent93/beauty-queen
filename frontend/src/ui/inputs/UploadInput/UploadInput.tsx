import { useAuth } from "@/hooks/useAuth"
import { useImageMutation } from "@/hooks/useEmployeeImageMutation"
import { useFormData } from "@/hooks/useFormData"
import { useErrorToast, useSuccessToast } from "@/hooks/useToast"
import { IFile } from "@/services/upload/upload.interface"
import { UploadService } from "@/services/upload/upload.service"
import clsx from "clsx"
import { FC } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { useMutation } from "react-query"
import { UploadedImage } from "./UploadedImage"

type UploadInputProps = {
    placeholder: string
    multiple?: boolean
    setValue: (value?: number | number[]) => void
    error?: boolean
} & (MultipleFileProps | SingleFileProps)

type MultipleFileProps = {
    multiple: true
    setValue: (value?: number[]) => void
    value?: IFile[]
}

type SingleFileProps = {
    multiple?: boolean
    setValue: (value?: number) => void
    value?: IFile
}

export const UploadInput: FC<UploadInputProps> = ({
    placeholder, 
    multiple, 
    setValue,
    value, 
    error
}) => {
    const {user} = useAuth()

    const { mutate: uploadMutate, data } = useImageMutation(
        (value) => setValue(multiple ? value.map(f => f.id) : value[0].id),
        (files) => UploadService.upload(useFormData({ files, userId: user?.id }))
    )
    
    const { mutate: removeMutate } = useMutation((id: number) => UploadService.remove(id), {
        onSuccess: () => {
            useSuccessToast()
            setValue(undefined)
        },
        onError: () => useErrorToast()
    })

    return (
        <div className={clsx("flex flex-col", error ? "mb-1" : "mb-3")}>
            <label className="mb-2 text-gray-500">
                {placeholder}
            </label>
            <div className="flex gap-1 flex-wrap">
                {
                    value && !multiple ?
                    <UploadedImage
                        path={value.source}
                        remove={() => removeMutate(value.id)} /> :
                    (value as IFile[] || data?.data)?.map(photo => (
                        <UploadedImage
                            key={photo.id}
                            path={photo.source}
                            remove={() => removeMutate(photo.id)} />
                    ))
                }
                <label className="h-28 w-36 flex items-center justify-center bg-slate-100 rounded-sm cursor-pointer border text-gray-500">
                    <AiOutlineUpload className="text-[22px] mr-2"/>
                    <span>Загрузить</span>
                    <input 
                        type="file"
                        onChange={({target: {files}}) => files && uploadMutate(files)}
                        multiple={multiple}
                        className="hidden" />
                </label>
            </div >
            {
                error && 
                    <div className="text-red-400 text-[12px] mb-3">
                        *Обязательное поле
                    </div>
            }
        </div>
    )
}