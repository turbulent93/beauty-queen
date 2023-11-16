import { useServicesQuery } from "@/hooks/useServicesQuery";
import { useUnitsQuery } from "@/hooks/useUnitsQuery";
import { IPromoDto } from "@/services/promo/promo.interface";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/inputs/Input";
import { NumberInput } from "@/ui/inputs/PercentInput";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { Textarea } from "@/ui/inputs/Textarea";
import { UploadInput } from "@/ui/inputs/UploadInput/UploadInput";
import { DateInput } from "@/ui/inputs/DateInput";
import { Loader } from "@/ui/Loader";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";

interface PromoFormProps {
    defaultValues?: IPromoDto
    mutate: (data: IPromoDto) => void
    title: string
    isLoading?: boolean
    isError?: boolean
}

const PROMO_IMAGES_PATH = process.env.PROMO_IMAGES_URL!

export const PromoForm: FC<PromoFormProps> = ({defaultValues, title, mutate, isError, isLoading}) => {
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm<IPromoDto>({defaultValues})

    

    const onSubmit: SubmitHandler<IPromoDto> = data => {
        mutate(data)
    }

    useEffect(() => {
        if(defaultValues) {
            reset(defaultValues)
        }
    }, [defaultValues])


    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                {title}
            </FormTitle>
            <Input 
                {...register("title", {required: true})} 
                placeholder="Название" 
                label="Название"
                error={!!errors.title}/>
            <Textarea 
                {...register("description", {required: true})} 
                placeholder="Описание" 
                label="Описание"
                error={!!errors.description}/>
            <div className="flex gap-3 items-end">
                <Controller 
                    control={control}
                    name="discount"
                    rules={{required: true}}
                    render={({field}) => (
                        <NumberInput 
                            percent={field.value} 
                            setPercent={field.onChange} 
                            label="Скидка"
                            placeholder="Скидка"/>
                    )}/>
                <Controller
                    control={control}
                    name="unitId"
                    rules={{required: true}}
                    render={({field, fieldState}) => (
                        <SearchSelect 
                            className="w-1/3"
                            onSearch={() => useUnitsQuery()}
                            value={field.value}
                            onChange={field.onChange}
                            // label="Единица измерения"
                            placeholder="Ед" 
                            disableSearch={true} 
                            error={!!fieldState.error}/>
                    )}/>
            </div>
            <Controller
                control={control}
                name="serviceIds"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <SearchSelect 
                        onSearch={(search?: string) => useServicesQuery(search)}
                        value={field.value}
                        onChange={field.onChange}
                        label="Услуги"
                        placeholder="Услуги" 
                        multiple={true} 
                        error={!!fieldState.error}/>
                    )}/>
            <div className="flex gap-2">
                <Controller 
                    control={control}
                    name="periodFrom"
                    rules={{required: true}}
                    render={({field, fieldState}) => (
                        <DateInput
                            value={{date: field.value}}
                            onChange={value => field.onChange(value?.date)}
                            label="Дата начала"
                            error={!!fieldState.error}/>
                    )} />
                <Controller 
                    control={control}
                    name="periodTo"
                    rules={{required: true}}
                    render={({field, fieldState}) => (
                        <DateInput
                            value={{date: field.value}}
                            onChange={value => field.onChange(value?.date)}
                            label="Дата окончания"
                            error={!!fieldState.error}/>
                    )} />
            </div>
            <Controller 
                control={control}
                name="image"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <UploadInput 
                        placeholder="Фото" 
                        setValue={field.onChange}
                        error={!!fieldState.error}/>
                    )} />
            <FormButtons isAdd={!defaultValues}/>
        </Form>
    )
}