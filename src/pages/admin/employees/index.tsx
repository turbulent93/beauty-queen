import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmployeeService } from "@/services/employee/employee.service";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { Button } from "@/ui/Button";
import { useRouter } from "next/router";
import { Loader } from "@/ui/Loader";
import Link from "next/link";
import { catchError } from "@/api/api.handler";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { AdminHeader } from "@/components/AdminHeader";
import { IEmployeeDto } from "@/services/employee/employee.interface";
import { EmployeeRow } from "@/components/forms/EmployeeRow";
import { Error } from "@/ui/Error";

const AdminEmployee: NextPage = () => {
    const router = useRouter()
    const {data: employees, isLoading, isError} = useQuery(["get employees"], 
        () => EmployeeService.get(), {
            select: (data) => data?.data,
            onError: (error: AxiosError) => useToast(catchError(error))
        })
    
    return (
        <Layout title="Сотрудники">
            <Sidebar>
                <AdminHeader className="mb-6">
                    <Button 
                        onClick={() => router.push("employees/user-form")}
                        className="mr-2"
                    >Добавить пользователя</Button>
                    <Button onClick={() => router.push("employees/add")}>Добавить сотрудника</Button>
                </AdminHeader>
                    {
                        isLoading ? <Loader /> :
                        isError ? <Error /> :
                        <Table >
                            <tbody>
                                {
                                    employees?.map((employee: IEmployeeDto) => (
                                        <EmployeeRow employee={employee} key={employee.id} />
                                    ))
                                } 
                            </tbody>      
                        </Table>
                    }
            </Sidebar>
        </Layout>
    )
}

export default AdminEmployee