import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IEmployeeWithIdsDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";

const AddEmployee: NextPage = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((data: IEmployeeWithIdsDto) => EmployeeService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get employees"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Добавить сотрудника" permissions={PagePermissions.employeesPage}>
            <EmployeeForm 
                mutate={data => mutation.mutate(data)} 
                title="Добавить сотрудника" />
        </Layout>
    )
}

export default AddEmployee