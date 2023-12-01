import { FC, useEffect } from "react";
import { useServicesQuery } from "@/hooks/useServicesQuery";
import { useSpecializationsQuery } from "@/hooks/useSpecializationsQuery";
import { IEmployeeWithIdsDto } from "@/services/employee/employee.interface";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/inputs/Input";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { UploadInput } from "@/ui/inputs/UploadInput/UploadInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import { FormTitle } from "@/ui/FormTitle";
import { FormButtons } from "./FormButtons";
import { Loader } from "@/ui/Loader";
import { Error } from "@/ui/Error";

interface EmployeeFormProps {
    defaultValues?: IEmployeeWithIdsDto,
    mutate: (data: IEmployeeWithIdsDto) => void,
    enableUserSelect?: boolean
    title: string
    userId?: number
    isLoading?: boolean
    isError?: boolean
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
    mutate, 
    defaultValues, 
    title, 
    isLoading, 
    isError, 
    enableUserSelect = true,
    userId
}) => {
    const { 
        register, 
        control, 
        handleSubmit, 
        reset, 
        getValues,
        formState: {errors} 
    } = useForm<IEmployeeWithIdsDto>()

    const onSubmit: SubmitHandler<IEmployeeWithIdsDto> = data => {
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
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormTitle>
                {title}
            </FormTitle>   
            {enableUserSelect && (
                <Controller 
                    control={control} 
                    name="userId" 
                    rules={{required: true}}
                    render={({field, fieldState}) => (
                        <SearchSelect
                            label="Пользователь"
                            placeholder="Пользователь"
                            onChange={field.onChange}
                            value={field.value}
                            onSearch={search => useUsersQuery(search, true, userId)} 
                            error={!!fieldState.error}/>
                    )} />
            )}
            <Input 
                label="Имя"
                placeholder="Имя"
                {...register("name", {required: true})}
                error={!!errors.name}/>
            <Input  
                label="Фамилия"
                placeholder="Фамилия"
                {...register("surname", {required: true})}
                error={!!errors.surname}/>
            <Controller 
                control={control}
                name="specializationId"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <SearchSelect   
                        label="Специализация"
                        value={field.value}
                        onChange={field.onChange} 
                        onSearch={search => useSpecializationsQuery(search)}
                        placeholder="Специализация"
                        error={!!fieldState.error}/>
                )}/>
            <Controller 
                control={control}
                name="serviceIds"
                defaultValue={[]} // !
                render={({field, fieldState}) => (
                    <SearchSelect 
                        label="Сервисы"
                        multiple
                        value={field.value || []}
                        onChange={field.onChange} 
                        defaultValue={defaultValues?.serviceIds}
                        onSearch={search => useServicesQuery(search)}
                        placeholder="Сервисы"
                        error={!!fieldState.error}/>
                )}/>
            <Controller
                control={control}
                name="imageId"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <UploadInput 
                        placeholder="Фото"  
                        setValue={field.onChange}
                        error={!!fieldState.error}
                        value={getValues("image")}/>
                )}/>
            <FormButtons isAdd={!defaultValues}/>
        </Form>
    )
}