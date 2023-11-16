import { useAppSelector } from "@/store/hooks";
import { FC } from "react";
import { Toast } from "./Toast";

export const ToastBar: FC = () => {
    const toasts = useAppSelector(store => store.toasts.toasts)

    return (
        <div className="fixed right-1 bottom-1 flex flex-col gap-1">
            {
                toasts.map(toast => (
                    <Toast toast={toast} key={toast.id} />
                ))
            }
        </div>
    )
}