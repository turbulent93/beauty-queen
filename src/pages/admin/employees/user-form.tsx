import { catchError } from "@/api/api.handler";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useRolesQuery } from "@/hooks/useRolesQuery";
import { useToast } from "@/hooks/useToast";
import { IUserDto } from "@/services/user/user.interface";
import { UserService } from "@/services/user/user.service";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/Input";
import { SearchSelect } from "@/ui/SearchSelect";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

const UserForm: NextPage = () => {
    const {handleSubmit, register, control} = useForm<IUserDto>()
    const router = useRouter()
    const mutation = useMutation((data: IUserDto) => UserService.post(data), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: () => useToast("Пользователь добавлен", true)
    })

    const onSubmit: SubmitHandler<IUserDto> = data => {
        mutation.mutate(data)
        router.replace("/admin/employees")
    }

    return (
        <Layout title="Добавить пользователя">
            <Sidebar>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormTitle>
                        Добавить пользователя
                    </FormTitle>
                    <Input label="Логин" placeholder="Логин" {...register("login")}/>
                    <Input label="Пароль" placeholder="Пароль" type="password" {...register("password")}/>
                    <Controller control={control} name="roleId" render={({field}) => (
                        <SearchSelect
                            label="Роль"
                            onChange={field.onChange}
                            value={field.value}
                            onSearch={search => useRolesQuery(search)}
                            className="mb-4"/>  
                    )}/>
                    <Button theme="gray">Добавить</Button>                
                </Form>
            </Sidebar>
        </Layout>
    )
}

export default UserForm