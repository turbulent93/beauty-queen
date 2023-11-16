import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FillScheduleDto } from "@/services/schedule/schedule.interface"
import { ScheduleService } from "@/services/schedule/schedule.service"
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/inputs/Input";
import { Checkbox } from "@/ui/inputs/Checkbox";
import { DateInput } from "@/ui/inputs/DateInput";
import moment from "moment";
import { Container } from "../Container";
import { TimeSelector } from "./TimeSelector";
import { useRouter } from "next/router";
import { Error } from "@/ui/Error";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { useSettings } from "@/hooks/useSettings";

interface FillScheduleProps {
    employeeId?: number
}

export const FillSchedule: FC<FillScheduleProps> = ({employeeId}) => {
    const {settings} = useSettings()
    const {
        register, 
        handleSubmit, 
        reset, 
        formState: { errors }, 
        control, 
        watch, 
        getValues,
        setValue
    } = useForm<FillScheduleDto>({defaultValues: {
        workDays: 2,
        weekendDays: 2
    }})
    const queryClient = useQueryClient()
    const {push} = useRouter()
    const [error, setError] = useState<string>()

    const {mutate} = useMutation((data: FillScheduleDto) => ScheduleService.fill(data), {
        onSuccess: () => {
            reset()

            const startDate = moment(getValues("startDate"), "YYYY-MM-DD")
            const endDate = moment(getValues("endDate"), "YYYY-MM-DD")

            queryClient.invalidateQueries(["get schedules", employeeId, startDate.year(), startDate.month()])
            queryClient.invalidateQueries(["get schedules", employeeId, endDate.year(), endDate.month()])
            push({pathname: "/admin/schedules", query: {id: employeeId}})
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const onSubmit: SubmitHandler<FillScheduleDto> = data => {
        if(!employeeId) {
            setError("Мастер не выбран")
        // } else if(!getValues("startDate")) {
        //     setError("Дата начала не выбрана")
        // } else if(!getValues("endDate")) {
        //     setError("Дата окончания не выбрана")
        } else {
            mutate({
                ...data,
                employeeId
            } as FillScheduleDto)
        }   
    }

    useEffect(() => {
        if(!settings)
            return

        if(!getValues("startAt"))
            reset({
                ...getValues(),
                startAt: settings.defaultStartWorkTime
            })

        if(!getValues("endAt"))
            reset({
                ...getValues(),
                endAt: settings.defaultEndWorkTime
            })
    }, [settings])
    
    return (
        <Container maxWidth={800}>
            <div className="flex md:gap-3 mt-3 md:items-center flex-col md:flex-row">
                <Input 
                    {...register("workDays", { required: true})} 
                    label="Рабочие дни"
                    placeholder="Количество рабочих дней"
                    error={!!errors.workDays}/>
                <Input 
                    {...register("weekendDays", { required: true })} 
                    label="Выходные дни"
                    placeholder="Количество выходных дней"
                    error={!!errors.weekendDays}/>
            </div>
            <Controller
                control={control}
                name="startDate"
                rules={{ required: true }}
                render={({field, fieldState}) => (
                    <DateInput 
                        label="Дата начала"
                        value={{date: field.value}}
                        onChange={value => field.onChange(value?.date)} 
                        endDate={watch("endDate")} 
                        error={!!fieldState.error} />
                )} />
            <Controller
                control={control}
                rules={{ required: true }}
                name="endDate"
                render={({field, fieldState}) => (
                    <DateInput 
                        label="Дата окончания"
                        value={{date: field.value}}
                        onChange={value => field.onChange(value?.date)} 
                        startDate={watch("startDate")} 
                        error={!!fieldState.error} />
                )} />
            <div className="flex flex-wrap gap-4">
                <Controller
                    control={control}
                    name="onlyWorkDays"
                    render={({field}) => (
                        <Checkbox
                            value={field.value}
                            onChange={field.onChange}
                            label="Только рабочие дни" 
                            uncheck={!!watch("onlyWeekendDays")}/>  
                    )} />
                <Controller
                    control={control}
                    name="onlyWeekendDays"
                    render={({field}) => (
                        <Checkbox
                            value={field.value}
                            onChange={field.onChange}
                            label="Только выходные дни дни" 
                            uncheck={!!watch("onlyWorkDays")}/>  
                    )} />
            </div>
            <Controller
                control={control}
                name="startAt"
                render={({field}) => (
                    <TimeSelector 
                        label="Время начала"
                        value={field.value}
                        onChange={field.onChange}
                        defaultStartAt={"3:00"} 
                        defaultEndAt={settings?.defaultEndWorkTime} />
                )} />
            <Controller
                control={control}
                name="endAt"
                render={({field}) => (
                    <TimeSelector 
                        label="Время окончания"
                        value={field.value}
                        onChange={field.onChange}
                        defaultStartAt={settings?.defaultStartWorkTime} 
                        defaultEndAt={settings?.defaultEndWorkTime} />
                )} />
            <Button 
                theme="gray" 
                onClick={handleSubmit(onSubmit)} 
                className="w-full mt-3"
            >
                Заполнить
            </Button>
            {
                error && <Error message={error}/>
            }
        </Container>
    )
}