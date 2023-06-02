import { IEmployeeDto } from "@/services/employee/employee.interface";
import { Button } from "@/ui/Button";
import { FC } from "react";

interface EmployeeCardProps {
    employee: IEmployeeDto,
    onClick?: (value: IEmployeeDto) => void
}

export const EmployeeCard: FC<EmployeeCardProps> = ({employee, onClick}) => {
    return (
        <div className="bg-slate-200 rounded p-3 text-center" key={employee.id}>
            <div
                style={{backgroundImage: `url(${process.env.EMPLOYEES_IMAGES_URL}/${employee.image})`}}
                className="w-[200px] h-[140px] bg-contain mb-2 rounded-sm"/>
            <h3 className="text-[20px] text-black mb-2">
                {employee.name + " " + employee.surname}
            </h3>
            <span className="text-black block mb-2">
                {employee.specialization.name}
            </span>
            <Button onClick={() => onClick && onClick(employee)}>
                Записаться
            </Button>
        </div>
    )
}