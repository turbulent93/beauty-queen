import { catchError } from "@/api/api.handler";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useFormData } from "@/hooks/useFormData";
import { useToast } from "@/hooks/useToast";
import { EmployeeService } from "@/services/employee/employee.service";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";

const AddEmployee: NextPage = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((data: FormData) => EmployeeService.post(data), {
        onError: (error: AxiosError) => useToast(catchError(error)),
        onSuccess: () => {
            useToast("Сотрудник добавлен", true)
            queryClient.invalidateQueries(["get employees"])
        }
    })

    return (
        <Layout title="Добавить сотрудника" role="Админ">
            <Sidebar>
                <EmployeeForm mutate={data => mutation.mutate(useFormData(data))} title="Добавить сотрудника"/>
            </Sidebar>
        </Layout>
    )
}

export default AddEmployee