import { IEmployeeDto } from "@/services/employee/employee.interface";
import { EmployeeService } from "@/services/employee/employee.service";
import { Button } from "@/ui/Button";
import { Td } from "@/ui/table/Td";
import Link from "next/link";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";

interface EmployeeRowProps {
    employee: IEmployeeDto
}

export const EmployeeRow: FC<EmployeeRowProps> = ({employee}) => {
    const queryClient = useQueryClient()
    
    const deleteMutation = useMutation((id: number) => EmployeeService.delete(id), {
        onSuccess: () => queryClient.invalidateQueries(["get employees"])
    })

    return (
        <tr key={employee.id}>
            <Td className="w-[220px]">
                <div className="w-[220px]">
                    <img 
                        src={`${process.env.EMPLOYEES_IMAGES_URL}/${employee.image}`} 
                        className="rounded-sm object-contain h-44" />
                </div>
            </Td>
            <Td className="text-left">
                <div className="flex flex-col gap-2">
                    <span className="text-[24px]">{`${employee.name} ${employee.surname}`}</span>
                    <span>{employee.specialization.name}</span>
                    <div className="flex gap-1">
                        {
                            employee.services.map(service => (
                                <span key={service.id} className="bg-gray-500 rounded-md px-3 py-1 text-white">{service.name}</span>
                            ))
                        }
                    </div>
                </div>
            </Td>
            <Td className="w-[200px]">
                <Button className="mb-auto ml-auto mr-2">
                    <Link href={`employees/update/${employee.id}`}>
                        Изменить
                    </Link>
                </Button>
                <Button 
                    className="mb-auto"
                    theme="red"
                    onClick={() => deleteMutation.mutate(employee.id)}
                    >Удалить</Button>
            </Td>
        </tr>
    )
}