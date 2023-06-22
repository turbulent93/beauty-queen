import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "react-query";
import { useToast } from "@/hooks/useToast";
import { catchError, setTokens } from "@/api/api.handler";
import { AxiosError } from "axios";
import { ILoginDto } from "@/services/auth/auth.interface";
import { Form } from "@/ui/Form";
import { useAuth } from "@/providers/AuthProvider";

const AdminAuth: NextPage = () => {
    const {register, handleSubmit} = useForm<ILoginDto>()
    const {replace} = useRouter()
    const {setUser} = useAuth()

    const loginMutation = useMutation((data: ILoginDto) => AuthService.login(data), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: ({data}) => {
            useToast("", true)
            replace("/admin/appointments")
            setUser({login: data.login, role: data.role, userId: data.userId})
        }
    })
    const onSubmitLogin: SubmitHandler<ILoginDto> = data => {
        loginMutation.mutate(data)
    }

    return (
        <Layout title="admin">
            <Form onSubmit={handleSubmit(onSubmitLogin)} className="mt-44">
                <Input 
                    {...register("login")}
                    placeholder="Логин" 
                    label="Логин" />
                <Input 
                    {...register("password")}
                    type="password"
                    placeholder="Пароль" 
                    label="Пароль" />
                <Button theme="gray" className="w-full">Войти</Button>
            </Form>
        </Layout>
    )
}

export default AdminAuth