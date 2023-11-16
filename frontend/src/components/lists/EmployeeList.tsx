import { IEmployee } from "@/services/employee/employee.interface";
import { Button } from "@/ui/Button";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface EmployeeListProps {
    employees?: IEmployee[]
    handler: (employee: IEmployee) => void
    employeeId?: number
    wrap?: "wrap" | "no-wrap" 
}

const SERVER_URL = process.env.SERVER_URL!

export const EmployeeList: FC<EmployeeListProps> = ({employees, handler, employeeId, wrap}) => {
    return (
        <div className={clsx("flex gap-4 scrollbar scrollbar-gray pb-2", 
                wrap == "no-wrap" ? "flex-nowrap overflow-x-auto" : "flex-wrap"
            )}>
            {
                employees?.map(employee => (
                    <div className={clsx(
                            "rounded p-3 text-center w-full min-[420px]:w-[calc(50%-8px)] sm:w-[calc(33%-8px)] flex-shrink-0", 
                            employee.id == employeeId ? "bg-slate-300" : "bg-slate-200"
                        )} 
                        key={employee.id}>
                        <img 
                            src={`${SERVER_URL}/${employee.image.source}`}
                            className="w-full rounded-sm object-cover h-72 md:h-80" />
                        <h3 className="text-[20px] text-black my-2">
                            {employee.name + " " + employee.surname}
                        </h3>
                        <span className="text-black block mb-2 font-light">
                            {employee.specialization.name}
                        </span>
                        <Button onClick={() => handler(employee)} theme="gray" className="my-2">
                            <Link href={{pathname: "/appointment", query: {employeeId: employee.id}}}>
                                Записаться
                            </Link>
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}