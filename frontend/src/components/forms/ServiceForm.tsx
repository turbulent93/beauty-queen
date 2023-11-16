import { IService } from "@/services/service/service.interface";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/inputs/Input";
import { Loader } from "@/ui/Loader";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormButtons } from "./FormButtons";

interface ServiceFormProps {
    defaultValues?: IService
    mutate: (data: IService) => void
    title: string
    isLoading?: boolean
    isError?: boolean
}

export const ServiceForm: FC<ServiceFormProps> = ({defaultValues, mutate, title, isLoading, isError}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IService>(defaultValues ? {defaultValues} : {})

    const onSubmit: SubmitHandler<IService> = data => {
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
            <FormTitle>{title}</FormTitle>
            <Input 
                {...register("name", {required: true})} 
                label="Название" 
                placeholder="Название"
                error={!!errors.name}/>
            <Input 
                {...register("duration", {required: true})} 
                label="Длительность в минутах" 
                placeholder="Длительность"
                error={!!errors.duration}/>
            <Input 
                {...register("price", {required: true})} 
                label="Цена" 
                placeholder="Цена"
                error={!!errors.price}/>
            <FormButtons isAdd={!defaultValues}/>
        </Form>
    )
}