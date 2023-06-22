import { IAppointmentDto } from "@/services/app/app.interface";
import { AppService } from "@/services/app/app.service";
import { resetAppointment, setPhone } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/ui/Button";
import { PhoneInput } from "@/ui/PhoneInput";
import { useRouter } from "next/router";
import { FC } from "react";
import { useMutation } from "react-query";

interface ChooseNumberProps {
    goBack: () => void
}

export const ChooseNumber: FC<ChooseNumberProps> = ({goBack}) => {
    const app = useAppSelector(store => store.appointment)
    const dispatch = useAppDispatch()

    const router = useRouter()
    const addMutation = useMutation((app: IAppointmentDto) => AppService.post(app))

    const handler = () => {
        addMutation.mutate(app.appointment as IAppointmentDto)
        router.replace("/")
        dispatch(resetAppointment())
    }

    return (
        <div className="px-6 py-3 border border-gray-300 bg-gray-100 rounded-md w-[400px] mx-auto mt-[140px]">
            <PhoneInput 
                phone={app.appointment.phone} 
                setPhone={(value) => dispatch(setPhone(value))}
                label="Номер телефона" />
            <div className="mx-auto mt-6 w-[340px] flex">
                    <Button 
                        className="mr-3 w-full" 
                        theme="gray"
                        onClick={goBack}
                        >Назад</Button>
                    <Button 
                        className="w-full" 
                        theme="gray"
                        onClick={handler}
                        disabled={!app.appointment.phone || app.appointment.phone.length < 12}
                        >Завершить</Button>
                </div>
        </div>
    )
}