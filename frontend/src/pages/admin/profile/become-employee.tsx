import { Container } from "@/components/Container";
import { DangerText } from "@/components/DangerText";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { Layout } from "@/components/Layout";
import { IEmployeeWithIdsDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";

const BecomeEMployeePage: NextPage = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation((data: IEmployeeWithIdsDto) => EmployeeService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get employees"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Профиль" permissions={PagePermissions.profilePage}>
            <Container>
                <EmployeeForm 
                    mutate={data => mutation.mutate(data)}
                    title="Изменить данные"
                    enableUserSelect={false} />
                <DangerText>
                    После заполнения данных карточка сотрудника будет отображаться на главной странице и пользователи будут иметь возможность записаться
                </DangerText>
            </Container>
        </Layout>
    )
}

export default BecomeEMployeePage