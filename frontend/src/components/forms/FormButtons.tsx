import { Button } from "@/ui/Button";
import { useRouter } from "next/router";
import { FC } from "react";

interface FormButtonsProps {
    isAdd: boolean
}

export const FormButtons: FC<FormButtonsProps> = ({isAdd}) => {
    const router = useRouter()

    return (
        <div className="mt-6 flex">
            <Button 
                className="mr-3 w-full" 
                theme="gray">
                {
                    isAdd ? "Добавить" : "Изменить"
                }
            </Button>
            <Button 
                className="w-full" 
                theme="gray"
                onClick={e => {
                    e?.preventDefault()
                    router.back()
                }}
                >Назад</Button>
        </div>
    )
}