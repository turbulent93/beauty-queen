import { useAuth } from "@/hooks/useAuth";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { ILoginDto } from "@/services/auth/auth.interface";
import { AuthService } from "@/services/auth/auth.service";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/inputs/Input";
import { PasswordInput } from "@/ui/inputs/PasswordInput";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const LoginForm: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginDto>()
    const {replace} = useRouter()
    const {login} = useAuth()

    const loginMutation = useMutation((data: ILoginDto) => AuthService.login(data), {
        onSuccess: ({data}) => {
            login(data)
            replace("/admin/appointments")
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const onSubmitLogin: SubmitHandler<ILoginDto> = data => {
        loginMutation.mutate(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitLogin)} className="mt-44">
            <Input 
                {...register("login", {required: true})}
                placeholder="Логин" 
                label="Логин" 
                error={!!errors.login}/>
            <PasswordInput 
                {...register("password", {required: true})}
                placeholder="Пароль" 
                label="Пароль" 
                error={!!errors.password}/>
            <Button 
                theme="gray" 
                className="w-full"
            >Войти</Button>
        </Form>
    )
}