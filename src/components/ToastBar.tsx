import { useAppSelector } from "@/store/hooks";
import { Toast } from "@/ui/Toast";
import { FC } from "react";

export const ToastBar: FC = () => {
    const errors = useAppSelector(state => state.errors.list)

    return (
        <div className="absolute bottom-4 right-4">
            {
                errors.map(toast => (
                    <Toast key={toast.id} toast={toast}/>
                ))
            }
        </div>
    )
}