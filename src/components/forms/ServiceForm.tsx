import { IService } from "@/services/service/service.interface";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/Input";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

interface ServiceFormProps {
    defaultValues?: IService
    mutate: (data: IService) => void
    title: string
}

export const ServiceForm: FC<ServiceFormProps> = ({defaultValues, mutate, title}) => {
    const {register, handleSubmit} = useForm<IService>(defaultValues ? {defaultValues} : {})
    const router = useRouter()

    const onSubmit: SubmitHandler<IService> = data => {
        mutate(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>{title}</FormTitle>
            <Input 
                {...register("name")} 
                label="Название" 
                placeholder="Название"/>
            <Input 
                {...register("duration")} 
                label="Длительность в минутах" 
                placeholder="Длительность"/>
            <Input 
                {...register("price")} 
                label="Цена" 
                placeholder="Цена"/>
            <Button theme="gray">Добавить</Button>
        </Form>
    )
}