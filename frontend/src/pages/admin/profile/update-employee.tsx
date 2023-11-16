import { Container } from "@/components/Container";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { Layout } from "@/components/Layout";
import { IEmployeeWithIdsDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "@/hooks/useAuth";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";

const UpdateEmployeePage: NextPage = () => {
    const queryClient = useQueryClient()
    const {employee} = useAuth()

    const mutation = useMutation((data: IEmployeeWithIdsDto) => EmployeeService.update(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get employees"])
            queryClient.invalidateQueries(["check auth"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Профиль" permissions={PagePermissions.profilePage}>
            <Container>
                <EmployeeForm 
                    defaultValues={employee}
                    mutate={data => mutation.mutate(data)}
                    title="Изменить данные" 
                    enableUserSelect={false}/>
            </Container>
        </Layout>
    )
}

export default UpdateEmployeePage