import { UserForm } from "@/components/forms/UserForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IUserDto } from "@/services/user/user.interface";
import { UserService } from "@/services/user/user.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

const UpdateUserPage: NextPage = () => {
    const {mutate} = useMutation((data: IUserDto) => UserService.update(data))

    const {query: {id}} = useRouter()

    const {data, isLoading, isError} = useQuery(["get user", id], () => UserService.getById(Number(id)), {
        select: ({data}) => ({
            id: data.id,
            login: data.login,
            roleId: data.role.id
        } as IUserDto),
        onSuccess: () => {
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Обновить пользователя" permissions={PagePermissions.usersPage}>
            {
                <UserForm 
                    mutate={(data: IUserDto) => mutate(data)} 
                    defaultValues={data} 
                    title="Обновить пользователя" 
                    isLoading={isLoading}
                    isError={isError}/>
            }
        </Layout>
    )
}

export default UpdateUserPage