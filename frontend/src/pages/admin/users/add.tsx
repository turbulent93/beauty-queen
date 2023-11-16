import { RegisterForm } from "@/components/forms/RegisterForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IRegisterDto } from "@/services/auth/auth.interface";
import { AuthService } from "@/services/auth/auth.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const AddUserPage: NextPage = () => {
    const router = useRouter()
    const {mutate} = useMutation((data: IRegisterDto) => AuthService.register(data), {
        onSuccess: () => {
            router.back()
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Добавить пользователя" permissions={PagePermissions.usersPage}>
            <RegisterForm 
                mutate={mutate} 
                title="Добавить пользователя"/>
        </Layout>
    )
}

export default AddUserPage