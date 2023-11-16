import { IAppointmentFormConext } from "@/pages/appointment";
import { Button } from "@/ui/Button";
import Link from "next/link";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

export const AppNav: FC = () => {
    const {watch, setValue, getValues} = useFormContext<IAppointmentFormConext>()

    const step = watch("step")
    const serviceId = watch("serviceId")
    const employeeId = watch("employeeId")
    const startAt = watch("startAt")

    const disabled = (step == 1 && !serviceId) ||
        (step == 2 && !employeeId) ||
        (step == 3 && !startAt)

    const goNext = () => {
        setValue("step", getValues("step") + 1)
    }

    const goBack = () => {
        setValue("step", getValues("step") - 1)
    }

    return (
        <>
            {
                step != 4 && (
                    <div className="mx-auto mt-6 max-w-[340px] flex">
                        {
                            step == 1 ? (
                                <Button className="mr-3 w-full" theme="gray">
                                    <Link href="/">
                                        На главную
                                    </Link>
                                </Button>
                            ) :
                            <Button 
                                className="mr-3 w-full" 
                                theme="gray"
                                onClick={goBack}>
                                    Назад
                            </Button>
                        }
                        <Button 
                            className="w-full" 
                            theme="gray"
                            onClick={goNext}
                            disabled={disabled}>
                                Далее
                        </Button>
                    </div>
                )
            }
        
        </>
    )
}