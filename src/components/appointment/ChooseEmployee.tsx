import { useDebounce } from "@/hooks/useDebounce";
import { IEmployeeDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { setEmployeeId } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Loader } from "@/ui/Loader";
import { Search } from "@/ui/Search";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { EmployeeCard } from "../EmployeeCard";
import { EmployeeList } from "../EmployeeList";

interface IChooseEmployeeProps {
    goNext: () => void
}

export const ChooseEmployee: FC<IChooseEmployeeProps> = ({goNext}) => {
    const app = useAppSelector(store => store.appointment.appointment)
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)
    const [isRandomError, setIsRandomError] = useState(false)

    const {data} = useQuery(["get employees by service", debounce], 
        () => EmployeeService.getByService(app.serviceId!, debounce), {
            select: ({data}) => data
        })

    const setRandomEmployee = () => {
        if(data) {
            const randomIndex = Math.floor(Math.random() * data.length)
            
            dispatch(setEmployeeId(data[randomIndex].id))
            goNext()

            return true
        }
        return false
    }

    const handler = (x: IEmployeeDto) => {
        dispatch(setEmployeeId((x.id)))
        goNext()
    }
    
    return (
        <>
            <div className="flex my-6 w-[900px] mx-auto gap-4 items-center">
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    className="w-full"
                    placeholder="Поиск мастера..." />
                <Button className="w-[220px]" onClick={() => setIsRandomError(!setRandomEmployee())}>
                    Выбрать любого
                </Button>
                {
                    isRandomError && <Error className="w-[240px]"/>
                }
            </div>
            <EmployeeList employees={data} handler={handler} employeeId={app.employeeId}/>
        </>
    )
}