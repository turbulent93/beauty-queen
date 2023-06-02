import { ChooseEmployee } from "@/components/appointment/ChooseEmployee";
import { ChooseNumber } from "@/components/appointment/ChoosePhone";
import { ChooseService } from "@/components/appointment/ChooseService";
import { Calendar } from "@/components/calendar/Calendar";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/ui/Button";
import { NextPage } from "next";
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Appointment: NextPage = () => {
    const [step, setStep] = useState(1)
    const app = useAppSelector(store => store.appointment)

    const disabled = (step == 1 && !app.appointment.serviceId) ||
        (step == 2 && !app.appointment.employeeId) ||
        (step == 3 && !app.appointment.startAt && !app.appointment.endAt)

    const goBack = () => {
        setStep(step - 1)
    }

    const goNext = () => {
        setStep(step + 1)
    }

    return (
        <Layout title="Запись" description="Appointment">
            <Container>
                {
                    step == 1 ? (
                        <ChooseService goNext={goNext}/>
                    ) :
                    step == 2 ? (
                        <ChooseEmployee goNext={goNext}/>
                    ) :
                    step == 3 ? (
                        <Calendar />
                    ) :
                    step == 4 && (
                        <ChooseNumber goBack={goBack}/>
                    )
                }
                {
                    step != 4 && step != 1 && (
                        <div className="mx-auto mt-6 w-[340px] flex">
                            <Button 
                                className="mr-3 w-full" 
                                theme="gray"
                                onClick={goBack}
                                >Назад</Button>
                            <Button 
                                className="w-full" 
                                theme="gray"
                                onClick={() => goNext()}
                                disabled={disabled}
                                >Далее</Button>
                        </div>
                    )
                }
            </Container>
        </Layout>
    )
}

export default Appointment