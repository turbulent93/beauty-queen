import { Container } from "@/components/Container";
import { EmployeeList } from "@/components/lists/EmployeeList";
import { Layout } from "@/components/Layout";
import { IEmployee } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "@/ui/Search";

const EmployeesPage: NextPage = () => {
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const {data: employees} = useQuery(["get employees", debounce], () => EmployeeService.get(search), {
        select: ({data}) => data
    })
    const router = useRouter()

    const handler = (employee: IEmployee) => {
        router.replace("/appointment", {query: {employeeId: employee.id}})
    }

    return (
        <Layout title="Сотрудники" description="Сотрудники">
            <Container>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    placeholder="Поиск по имени.." 
                    className="my-6 w-[300px]"/>
                <EmployeeList 
                    employees={employees} 
                    handler={handler} />
            </Container>
        </Layout>
    )
}

export default EmployeesPage