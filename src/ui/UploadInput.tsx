import { useFormData } from "@/hooks/useFormData"
import { useToast } from "@/hooks/useToast"
import { GalleryService } from "@/services/gallery/gallery.service"
import { FC, useEffect } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { useMutation } from "react-query"
import { RiDeleteBin5Line } from "react-icons/ri"

const EMPLOYEES_IMAGES_URL = process.env.EMPLOYEES_IMAGES_URL || ""

type UploadInputProps = {
    type?: "file"
    placeholder: string
    multiple?: true
    upload: (files: FileList) => void
    value: string | string[]
    path: string
    remove: (value: string) => void
}

export const UploadInput: FC<UploadInputProps> = ({placeholder, multiple, upload, value, path, remove}) => {
    // useEffect(() => {
    //     console.log(value)
    // }, [value])

    return(
        <div className="flex flex-col mb-4">
            <label className="mb-2 text-gray-500">
                {placeholder}
            </label>
            <div className="flex gap-1 flex-wrap">
                {
                    (value as string[]) ? 
                        (value as string[]).map(photo => (
                            <div className="relative" key={photo}>
                                <img 
                                    src={`${path}/${photo}`}
                                    className="h-28 rounded-sm object-cover"/>
                                <div 
                                    className="absolute top-0 right-0 rounded-bl px-3 py-2 bg-red-500 cursor-pointer"
                                    onClick={() => remove(photo)}>
                                    <div className="h-4 w-4 text-white">
                                        <RiDeleteBin5Line />
                                    </div>
                                </div>
                            </div>
                    )) : (value as string) && (
                        <img 
                            src={`${path}/${value}`}
                            className="h-28 rounded-sm object-cover"/>
                    )
                }
                <label className="h-28 w-36 flex items-center justify-center bg-slate-100 rounded-sm cursor-pointer border text-gray-500">
                    <AiOutlineUpload className="text-[22px] mr-2"/>
                    <span>Загрузить</span>
                    <input 
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if(files) {
                                upload(files)
                            }
                        }}
                        multiple={multiple}
                        className="hidden" />
                </label>
            </div >
        </div>
    )
}