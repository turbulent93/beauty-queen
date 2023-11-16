import { IAppointmentDto } from "@/services/app/app.interface";
import { Error } from "@/ui/Error";
import clsx from "clsx";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ProgressCell } from "./ProgressCell";
import { appCells } from "./cells";

export const AppProgress: FC = () => {
    const {formState: {errors}, watch} = useFormContext<IAppointmentDto>()

    const formHasErrors = () => {
        return !!errors.root
    }

    return (
        <>
            <div className="relative h-20 flex justify-between items-center max-w-[380px] mx-auto cursor-pointer">
                <hr className={clsx("absolute top-1/2 w-full h-[2px] border-0 -z-10",
                    formHasErrors() ? "bg-red-300" : "bg-slate-300")}/>
                {
                    appCells.map(cell => (
                        <ProgressCell 
                            key={cell.name}
                            Icon={cell.Icon} 
                            isSelected={!!watch(cell.name)}
                            isError={!!errors[cell.name]}
                            step={cell.step} />
                    ))
                }
            </div>
            {
                formHasErrors() && (
                    <Error message={
                        errors.serviceId ? "Выберите услугу" : 
                            errors.employeeId ? "Выберите сотрудника" : 
                            errors.employeeId && "Выберите дату и время оказания услуги"}/>
                )
            }
        </>
    )
}