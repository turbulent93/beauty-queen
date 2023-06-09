import { catchError } from "@/api/api.handler";
import { Sidebar } from "@/components/Sidebar";
import { useFormData } from "@/hooks/useFormData";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmployeeService } from "@/services/employee/employee.service"
import { useRouter } from "next/router";
import { Loader } from "@/ui/Loader";
import { Layout } from "@/components/Layout";
import { Error } from "@/ui/Error";
import { IEmployee, IEmployeeDto } from "@/services/employee/employee.interface";
import { IService } from "@/services/service/service.interface";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

const UpdateEmployee: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {id} = router.query
    const {data, isError, isLoading} = useQuery(
        ["get employee", id], 
        () => EmployeeService.getById(id as string),
        {
            select: (data): IEmployee => {
                const res: IEmployeeDto = data?.data
                return {
                    id: res.id,
                    image: res.image,
                    name: res.name,
                    surname: res.surname,
                    serviceIds: res.services.map((x: IService) => x.id),
                    specializationId: res.specialization.id,
                    userId: res.user.id 
                } as IEmployee
            },
            onSuccess: (data) => console.log(data)
        })
    const mutation = useMutation((data: IEmployee) => EmployeeService.update(data.id, useFormData(data)), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: () => {
            useToast("Сотрудник обновлен", true)
            router.replace("/admin/employees")
            queryClient.invalidateQueries(["get employees"])
            queryClient.invalidateQueries(["get employee", id])
        }
    })

    return (
        <Layout title="Изменить сотрудника" role="Админ">
            <Sidebar>
                {
                    isLoading ? <Loader className="mt-8"/> :
                    isError ? <Error/> :
                    <EmployeeForm 
                        mutate={(data) => {
                            mutation.mutate(data) 
                            console.log(data)}} 
                        defaultValues={data}
                        title="Изменить сотрудника"/>
                }
            </Sidebar>
        </Layout>
    )
}

export default UpdateEmployee