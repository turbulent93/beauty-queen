import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "react-query";
import { useToast } from "@/hooks/useToast";
import { catchError } from "@/api/api.handler";
import { AxiosError } from "axios";
import { ILoginDto } from "@/services/auth/auth.interface";

const AdminAuth: NextPage = () => {
    const {register, handleSubmit} = useForm<ILoginDto>()
    const {replace} = useRouter()
    const loginMutation = useMutation((data: ILoginDto) => AuthService.login(data), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: () => {
            useToast("", true)
            replace("/admin/appointments")
        }
    })
    const registrationMutation = useMutation((data: ILoginDto) => AuthService.register(data), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: () => useToast("", true)
    })


    const onSubmitRegister: SubmitHandler<ILoginDto> = data => {
        registrationMutation.mutate(data)
    }

    const onSubmitLogin: SubmitHandler<ILoginDto> = data => {
        loginMutation.mutate(data)
    }

    return (
        <Layout title="admin">
            <div className="w-[600px] mx-auto">
            <form 
                className="w-56 mx-auto bg-slate-500 rounded-md py-8 px-6 mt-24"
                >
                <Input 
                    {...register("login")}
                    placeholder="Login" 
                    label="Login" />
                <Input 
                    {...register("password")}
                    placeholder="Password" 
                    label="Password" />
                <Button onClick={handleSubmit(onSubmitRegister)} className="mr-2">Register</Button>
                <Button onClick={handleSubmit(onSubmitLogin)}>Login</Button>
            </form>
            </div>
        </Layout>
    )
}

export default AdminAuth