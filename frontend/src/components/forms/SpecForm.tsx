import { ISpec } from "@/services/spec/spec.interface";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/inputs/Input";
import { Loader } from "@/ui/Loader";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";

interface SpecFormProps {
    defaultValues?: ISpec
    mutate: (data: ISpec) => void
    title: string
    isLoading?: boolean
    isError?: boolean
}

export const SpecForm: FC<SpecFormProps> = ({defaultValues, mutate, title, isLoading, isError}) => {
    const {handleSubmit, register, reset, formState: {errors}} = useForm<ISpec>(defaultValues ? {defaultValues} : {})

    const onSubmit: SubmitHandler<ISpec> = data => {
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
                {...register("name", {required: true})}
                label="Добавить новую" 
                placeholder="Специализация" 
                error={!!errors.name}/>
            <FormButtons isAdd={!defaultValues} />
        </Form>
    )
}