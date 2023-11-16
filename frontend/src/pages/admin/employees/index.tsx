import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmployeeService } from "@/services/employee/employee.service";
import { Button } from "@/ui/Button";
import { useRouter } from "next/router";
import { Table } from "@/ui/table/Table";
import { AdminHeader } from "@/components/AdminHeader";
import { Td } from "@/ui/table/Td";
import { ActionButtons } from "@/ui/table/ActionButtons";
import { RoundedImage } from "@/ui/table/RoundedImage";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { useState } from "react";
import { Container } from "@/components/Container";

const SERVER_URL = process.env.SERVER_URL!

const AdminEmployee: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [selectedId, setSelectedId] = useState<number>()

    const {data: employees, isLoading, isError} = useQuery(["get employees"], 
        () => EmployeeService.getWithUser(), {
            select: (data) => data?.data,
        })

    const {mutate} = useMutation((id: number) => EmployeeService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get employees"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })
        
    return (
        <Layout title="Сотрудники" permissions={PagePermissions.employeesPage}>
            <Container>
                <AdminHeader>
                    <Button onClick={() => router.push("employees/add")}>Добавить сотрудника</Button>
                </AdminHeader>
                <Table 
                    colNames={["", "Логин", "Имя", "Специализация", "Услуги", "Действие"]}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                    isLoading={isLoading} 
                    isError={isError}
                >
                    {
                        employees?.map((employee) => (
                            <tr key={employee.id}>
                                <RoundedImage 
                                    src={`${SERVER_URL}/${employee?.image?.source}`}/>
                                <Td>
                                    {employee?.user?.login}
                                </Td>
                                <Td>
                                    {employee.name + " " + employee.surname}
                                </Td>
                                <Td>
                                    {employee.specialization.name}
                                </Td>
                                <Td className="max-w-[300px] overflow-x-auto scrollbar scrollbar-red rounded-md">
                                    <div className="flex gap-1">
                                        {employee.services?.map(service => (
                                            <div className="bg-gray-200 px-2 py-1 rounded-md" key={service.id}>
                                                {service.name}
                                            </div>
                                        ))}
                                    </div>
                                </Td>
                                <ActionButtons 
                                    updateUrl={`employees/update/${employee.id}`} 
                                    deleteHandler={() => setSelectedId(employee.id)}/>
                            </tr>
                        ))
                    }      
                </Table>
            </Container>
        </Layout>
    )
}

export default AdminEmployee