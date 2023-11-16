import { useAppDispatch } from "@/store/hooks";
import { removeToast } from "@/store/toasts.slice";
import { TOAST_ERROR_MESSAGE } from "@/utils/constants/toastMessages";
import clsx from "clsx";
import { FC, useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IToast } from "./toast.interface";

interface ToastProps {
    toast: IToast
}

export const Toast: FC<ToastProps> = ({toast}) => {
    const dispatch = useAppDispatch()
    const [isRemoved, setIsRemoved] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRemoved(true)
            
        }, 3000)

        return () => clearTimeout(timer)
    }, [toast.id, removeToast])

    useEffect(() => {
        if(!isRemoved) return

        const removeTimer = setTimeout(() => {
            dispatch(removeToast(toast))
        }, 500)

        return () => clearTimeout(removeTimer)
    }, [isRemoved])

    return (
        <div 
            className={clsx(
                "border rounded-full bg-gray-100 w-[300px] px-4 py-2 flex items-center duration-500",
                isRemoved && "translate-x-full"
            )}
            onClick={() => {
                dispatch(removeToast(toast))
            }}
        >
            {
                toast.type == "success" ? 
                <div className="p-1 bg-green-300 rounded-full mr-3 text-white">
                    <AiOutlineCheck size={12} />
                </div> :
                <div className="p-1 bg-red-300 rounded-full mr-3 text-white">
                    <AiOutlineClose size={12} />
                </div>
            }
            <span className="truncate">
                {
                    toast.text ? toast.text :
                        toast.type == "success" ? 
                            "Операция прошла успешно" :
                            TOAST_ERROR_MESSAGE
                }
            </span>    
            <div 
                className="text-gray-700 ml-auto p-2"
            >
                <AiOutlineClose size={10}/>
            </div>
        </div>    
    )
}