import { FC } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

interface UploadedImageProps {
    path: string
    remove?: () => void
}

const SERVER_URL = process.env.SERVER_URL!

export const UploadedImage: FC<UploadedImageProps> = ({path, remove}) => {
    return (
        <div className="relative">
            <img 
                src={`${SERVER_URL}/${path}`}
                className="h-28 rounded-sm object-cover"/>
            <div 
                className="absolute top-0 right-0 rounded-bl px-3 py-2 bg-red-500 cursor-pointer"
                onClick={remove}>
                <div className="h-4 w-4 text-white">
                    <RiDeleteBin5Line />
                </div>
            </div>
        </div>
    )
}