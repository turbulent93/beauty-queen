import { useRolesQuery } from "@/hooks/useRolesQuery";
import { IRegisterDto } from "@/services/auth/auth.interface";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/inputs/Input";
import { PasswordInput } from "@/ui/inputs/PasswordInput";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";

interface RegisterFormProps {
    title: string
    mutate: (data: IRegisterDto) => void
}

export const RegisterForm: FC<RegisterFormProps> = ({title, mutate}) => {
    const {handleSubmit, register, control, formState: {errors}} = useForm<IRegisterDto>()

    const onSubmit: SubmitHandler<IRegisterDto> = data => {
        mutate(data)
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
            <PasswordInput 
                {...register("password", {required: true})} 
                label="Пароль" 
                placeholder="Пароль" 
                error={!!errors.password}/>
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
            <PasswordInput
                {...register("secretKey", {required: true})}
                placeholder="Секретный ключ"
                label="Секретный ключ" 
                error={!!errors.secretKey}/>
            <FormButtons isAdd={true} />
        </Form>
    )
}