import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useQuery } from "react-query";
import { EmployeeService } from "@/services/employee/employee.service";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { Button } from "@/ui/Button";
import { useRouter } from "next/router";
import { Loader } from "@/ui/Loader";
import { catchError } from "@/api/api.handler";
import { Table } from "@/ui/table/Table";
import { AdminHeader } from "@/components/AdminHeader";
import { IEmployeeDto } from "@/services/employee/employee.interface";
import { EmployeeRow } from "@/components/forms/EmployeeRow";
import { Error } from "@/ui/Error";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

const AdminEmployee: NextPage = () => {
    const router = useRouter()
    const {data: employees, isLoading, isError} = useQuery(["get employees"], 
        () => EmployeeService.get(), {
            select: (data) => data?.data,
            onError: (error: AxiosError) => useToast(catchError(error))
        })
        
    return (
        <Layout title="Сотрудники" role="Админ">
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