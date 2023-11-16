import { useDebounce } from "@/hooks/useDebounce";
import { IAppointmentFormConext } from "@/pages/appointment";
import { IEmployee, IEmployeeWithUserDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Search } from "@/ui/Search";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { EmployeeList } from "../lists/EmployeeList";

export const ChooseEmployee: FC = () => {
    const {watch, reset, getValues} = useFormContext<IAppointmentFormConext>()

    const serviceId = watch("serviceId")
    const employeeId = watch("employeeId")

    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const {data: employees} = useQuery(["get employees by service", debounce], 
        () => EmployeeService.get(debounce, serviceId), {
            select: ({data}) => data
        })

    const setRandomEmployee = () => {
        if(employees) {
            const randomIndex = Math.floor(Math.random() * employees.length)
            
            if(employees[randomIndex]) {
                reset({
                    ...getValues(),
                    employeeId: employees[randomIndex].id,
                    step: getValues("step") + 1
                })
            }
        }
    }

    const handler = (e: IEmployee) => {
        reset({
            ...getValues(),
            employeeId: e.id,
            step: getValues("step") + 1
        })
    }
    
    return (
        <>
            <div className="flex flex-col md:flex-row my-6 max-w-[900px] mx-auto gap-4 items-center">
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className="w-full"
                    placeholder="Поиск мастера..." />
                <Button className="w-full md:w-[220px]" onClick={() => setRandomEmployee()}>
                    Выбрать любого
                </Button>
            </div>
            <EmployeeList 
                employees={employees} 
                handler={handler} 
                employeeId={employeeId} />
        </>
    )
}