import { useRolesQuery } from "@/hooks/useRolesQuery";
import { IUpdateUserDto, IUserDto } from "@/services/user/user.interface";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Checkbox } from "@/ui/inputs/Checkbox";
import { Input } from "@/ui/inputs/Input";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { Loader } from "@/ui/Loader";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";

type UserFormProps = {
    defaultValues?: IUserDto
    mutate: (data: IUpdateUserDto) => void
    title: string 
    isLoading: boolean
    isError: boolean
}

export const UserForm: FC<UserFormProps> = ({defaultValues, mutate, title, isLoading, isError}) => {
    const [isChangePassword, setIschangePassowrd] = useState<boolean | undefined>(false)
 
    const {handleSubmit, register, control, reset, getValues, formState: {errors}} = useForm<IUpdateUserDto>()

    const onSubmit: SubmitHandler<IUpdateUserDto> = data => {
        mutate(data)
    }

    useEffect(() => {
        if(defaultValues) {
            reset(defaultValues)
        }
    }, [defaultValues])

    useEffect(() => {
        if(!isChangePassword)
            reset({...getValues(), newPassword: undefined, oldPassword: undefined})
    }, [isChangePassword])

    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <Error/>
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                {title}
            </FormTitle>
            <Input 
                {...register("login", {required: true})}
                label="Логин" 
                placeholder="Логин" 
                error={!!errors.login}/>
            <Controller 
                control={control} 
                name="roleId" 
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <SearchSelect
                        label="Роль"
                        placeholder="Роль"
                        onChange={field.onChange}
                        value={field.value}
                        onSearch={search => useRolesQuery(search)}
                        className="mb-4"
                        error={!!fieldState.error}/>  
                )}/>
            <Checkbox 
                value={isChangePassword} 
                onChange={setIschangePassowrd}
                label="Изменить пароль" />
            {
                isChangePassword && (
                    <>
                        <Input 
                            {...register("oldPassword", {required: true})}
                            label="Старый пароль" 
                            placeholder="Старый пароль" 
                            error={!!errors.oldPassword}/>
                        <Input 
                            {...register("newPassword", {required: true})}
                            label="Новый пароль" 
                            placeholder="Новый пароль" 
                            error={!!errors.newPassword} />
                    </>
                )
            }
            <FormButtons isAdd={false} />
        </Form>
    )
}