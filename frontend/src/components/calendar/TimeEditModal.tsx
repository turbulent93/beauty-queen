import { useSettings } from "@/hooks/useSettings";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { useCalendar } from "@/providers/CalendarProvider";
import { IScheduleDto } from "@/services/schedule/schedule.interface";
import { ScheduleService } from "@/services/schedule/schedule.service";
import { Button } from "@/ui/Button";
import { Loader } from "@/ui/Loader";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Modal } from "../Modal";
import { TimeSelector } from "./TimeSelector";

export const TimeEditModal: FC = () => {
    const {
        showTimeEditModal, 
        toggleShowTimeEditModal,
        employeeId,
        selectedYear,
        selectedMonth,
        value,
        onChange
    } = useCalendar()
    const queryClient = useQueryClient()
    const {settings} = useSettings()
    const {watch, setValue, handleSubmit, reset} = useForm<IScheduleDto>()

    const {mutate: updateMutate} = useMutation((data: IScheduleDto) => ScheduleService.update(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get schedules", employeeId, selectedYear, selectedMonth?.number])
            toggleShowTimeEditModal()
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const {mutate: removeMutate} = useMutation((id: number) => ScheduleService.delete(id), {
        onSuccess: () => {
            toggleShowTimeEditModal()
            queryClient.invalidateQueries(["get schedules", employeeId, selectedYear, selectedMonth?.number])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const onSubmit: SubmitHandler<IScheduleDto> = data => {
        updateMutate(data)
    }

    useEffect(() => {
        reset({...value, id: value?.scheduleId, employeeId})
    }, [value])

    useEffect(() => {
        if(!showTimeEditModal && onChange)
            onChange(undefined)
    }, [showTimeEditModal])

    return (
        <Modal 
            isOpen={showTimeEditModal} 
            setIsOpen={toggleShowTimeEditModal}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] mx-auto">
                {
                    settings ?
                    <>
                        <TimeSelector 
                            label="Время начала"
                            value={watch("startAt")}
                            onChange={(value) => setValue("startAt", value)}
                            defaultStartAt={settings?.defaultStartWorkTime} 
                            defaultEndAt={settings?.defaultEndWorkTime} />
                        <TimeSelector 
                            label="Время окончания"
                            value={watch("endAt")}
                            onChange={(value) => setValue("endAt", value)}
                            defaultStartAt={settings?.defaultStartWorkTime} 
                            defaultEndAt={settings?.defaultEndWorkTime} 
                            includeLast={true} />
                    </> : 
                    <Loader/>
                }
                <div className="mt-6 flex">
                    <Button className="mr-3 w-full">
                        Изменить
                    </Button>
                    <Button 
                        className="w-full" 
                        theme="red"
                        onClick={e => {
                            e?.preventDefault()
                            
                            if(value?.scheduleId) 
                                removeMutate(value?.scheduleId)
                        }}
                    >
                        Удалить
                    </Button>
                </div>
            </form>
        </Modal>
    )
}