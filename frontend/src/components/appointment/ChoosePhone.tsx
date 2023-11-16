import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IAppointmentFormConext } from "@/pages/appointment";
import { IAppointment, IAppointmentDto } from "@/services/app/app.interface";
import { AppService } from "@/services/app/app.service";
import { Button } from "@/ui/Button";
import { PhoneInput } from "@/ui/inputs/PhoneInput";
import { getLocalStorageAppointments } from "@/utils/appointments/getLocalStorageAppointments";
import { setLocalStorageAppointments } from "@/utils/appointments/setLocalStorageAppointments";
import { useRouter } from "next/router";
import { FC } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

export const ChooseNumber: FC = () => {
    const router = useRouter()

    const {
        handleSubmit, 
        setValue, 
        getValues, 
        control,
        setError
    } = useFormContext<IAppointmentFormConext>()

    const {mutate} = useMutation((app: IAppointmentDto) => AppService.post(app), {
        onSuccess: (data) => {
            router.replace("/")
            useSuccessToast()

            const appointments: IAppointment[] = getLocalStorageAppointments()

            appointments.push(data.data)

            setLocalStorageAppointments(appointments)
        },
        onError: () => useErrorToast()
    })

    const handler: SubmitHandler<IAppointmentFormConext> = (data: IAppointmentFormConext) => {
        if(!data.serviceId) 
            setError("serviceId", {})
        if(!data.employeeId) 
            setError("employeeId", {})
        if(!data.scheduleId) 
            setError("scheduleId", {})        
        if(!data.startAt) 
            setError("startAt", {})
        if(!data.endAt) 
            setError("endAt", {})

        mutate({
            serviceId: data.serviceId,
            employeeId: data.employeeId,
            scheduleId: data.scheduleId,
            startAt: data.startAt,
            endAt: data.endAt,
            phone: data.phone,
            promoId: data.promoId
        } as IAppointmentDto)
    }

    return (
        <div className="px-6 py-3 border border-gray-300 bg-gray-100 rounded-md max-w-[400px] mx-auto mt-[60px] md:mt-[140px]">
            <Controller
                control={control}
                name="phone"
                rules={{required: true, maxLength: 16, minLength: 16}}
                render={({field}) => (
                    <PhoneInput 
                        phone={field.value} 
                        setPhone={field.onChange}
                        label="Номер телефона" />
                )}/>
            <div className="mx-auto mt-6 flex">
                <Button 
                    className="mr-3 w-full" 
                    theme="gray"
                    onClick={() => setValue("step", getValues("step") - 1)}
                    >Назад</Button>
                <Button 
                    className="w-full" 
                    theme="gray"
                    onClick={handleSubmit(handler)}
                    // disabled={!errors.root}
                    >Завершить</Button>
            </div>
        </div>
    )
}