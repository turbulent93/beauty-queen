import { NextPage } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmployeeService } from "@/services/employee/employee.service"
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { IEmployeeWithIdsDto } from "@/services/employee/employee.interface";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";

const UpdateEmployee: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {id} = router.query
    
    const {data, isError, isLoading} = useQuery(
        ["get employee", id], 
        () => EmployeeService.getById(id as string),
        {
            select: ({data}) => data
        })
    const mutation = useMutation((data: IEmployeeWithIdsDto) => EmployeeService.update(data), {
        onSuccess: () => {
            router.replace("/admin/employees")
            queryClient.invalidateQueries(["get employees"])
            queryClient.invalidateQueries(["get employee", id])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Изменить сотрудника" permissions={PagePermissions.employeesPage}>
            {
                data && (
                    <EmployeeForm 
                        mutate={(data) => {
                            mutation.mutate(data) 
                        }} 
                        defaultValues={data}
                        title="Изменить сотрудника"
                        isLoading={isLoading}
                        isError={isError} 
                        userId={data?.userId} />
                )
            }
        </Layout>
    )
}

export default UpdateEmployee