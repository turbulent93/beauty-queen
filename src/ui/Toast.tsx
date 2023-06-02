import { IToast, removeToast } from "@/store/toasts.slice";
import { useAppDispatch } from "@/store/hooks";
import clsx from "clsx";
import { FC, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"

interface ToastProps {
    toast: IToast
}

export const Toast: FC<ToastProps> = ({toast}) => {
    const dispatch = useAppDispatch()
    const [removed, setRemoved] = useState(false)
    const [added, setAdded] = useState(false)
    const delay = 2000, liveTime = 10000

    useEffect(() => {
        // setTimeout(() => {
        //     setAdded(true)
        // }, delay)
        setAdded(true)
        setTimeout(() => {
            handler()
        }, liveTime)
    }, [])

    const handler = () => {
        setRemoved(true)
        setTimeout(() => {
            dispatch(removeToast(toast))
        }, delay)
    }

    return (
        <div 
            className={clsx("px-4 py-2 flex mb-1 rounded-sm border items-center gap-4 transition-transform relative animate-fade", `duration-${delay}`,
            {
                "bg-red-300 text-red-600 border-red-600": !toast.isSuccess,
                "bg-green-300 text-green-600 border-green-600": toast.isSuccess,
                "translate-x-[110%]": !added || removed,
                "translate-x-0": added && !removed
            })}>
                <div className="flex flex-col">
                    <strong
                        className="w-[250px]"
                    >{!toast.isSuccess ? "Произошла ошибка" : "Операция выполнена успешно"}</strong>
                    <span className="w-[250px] truncate">{toast.message}</span>
                </div>
                <AiOutlineClose 
                    onClick={() => handler()}
                    className="cursor-pointer"/>
        </div>
    )
}